import { DatePipe, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { PiezasService } from "../../../../core/services/piezas.service";
import { sortArray } from "../../../../shared/components/utils/utils";
import { Nullable } from "../../../../shared/helpers/Nullable.interface";
import { Undefinable } from "../../../../shared/helpers/Undefinable.interface";
import { PaymentMethods, PaymentMethodsArray, Pieza, PiezaNueva } from "../../../../shared/models/pieza.interface";

registerLocaleData(es);

@Component({
    selector: 'app-sold',
    templateUrl: './sold.component.html',
    styleUrl: './sold.component.css'
})
export class SoldComponent {

    fechaFiltro: string | null = "all";
    fechasVentas: string[] = [];
    piezas: Pieza[] = [];
    piezasNuevas: PiezaNueva[] = [];

    paymentMethods = PaymentMethodsArray;

    showModal = false;
    loading = false;

    sortFieldPieza = "";
    editPieza: Undefinable<Pieza>;

    constructor(
        private datePipe: DatePipe,
        private piezasService: PiezasService,
    ) { }

    async ngOnInit() {
        await this.getAllPiezas();
    }

    async getAllPiezas() {
        try {
            this.loading = true;
            this.piezasNuevas = await this.piezasService.getByQuery("ventas", [], "!=");

            this.mapPiezasNuevas(this.piezasNuevas);
            this.generateFechasVentas();
        } catch (error) {
            alert(error);
        } finally {
            this.loading = false;
        }
    }

    mapPiezasNuevas(piezas: PiezaNueva[]) {
        this.piezas = [];
        piezas.forEach(piezaNueva => {
            piezaNueva.ventas.forEach(venta => {
                this.piezas.push({
                    id: piezaNueva.id,
                    name: piezaNueva.name,
                    type: piezaNueva.type,
                    dateSold: venta.dateSold,
                    price: piezaNueva.price,
                    coments: venta.coments,
                    paymentMethod: venta.paymentMethod,
                });
            });
        });
        this.piezas = this.piezas.sort((a, b) => a.dateSold! < b.dateSold! ? 1 : -1);
    }

    async unSoldPieza(index: number) {
        const piezaVender = this.piezas[index];
        const piezaSold: Undefinable<PiezaNueva> = this.piezasNuevas.find(piezaNueva => piezaNueva.id === piezaVender.id);
        if (piezaSold) {
            piezaSold.stock += 1;
            piezaSold.ventas = piezaSold.ventas.filter(venta => venta.dateSold !== piezaVender.dateSold);
            try {
                await this.piezasService.updateDoc(piezaSold.id, piezaSold);
            } catch (error) {
                console.error(error);
            } finally {
                this.showModal = false;
            }
            if (!piezaSold.ventas.length) {
                this.eliminatePieza(piezaSold);
            }
        }
    }
    editarPieza(piezaVender: Pieza) {
        this.editPieza = piezaVender;
        this.showModal = true;
    }

    async updatePieza(piezaVender: Pieza) {
        const indexPiezasNuevas = this.piezasNuevas.findIndex(piezaNueva => piezaNueva.id === piezaVender.id);
        const piezaSold = this.piezasNuevas[indexPiezasNuevas];
        if (piezaSold) {
            const index = piezaSold.ventas.findIndex(venta => venta.dateSold === piezaVender.dateSold);

            piezaSold.ventas[index].paymentMethod = piezaVender.paymentMethod;
            piezaSold.ventas[index].coments = piezaVender.coments;
            try {
                await this.piezasService.updateDoc(piezaSold.id, piezaSold);
            } catch (error) {
                console.error(error);
            } finally {
                this.showModal = false;
            }
        }
    }

    eliminatePieza(piezaSold: PiezaNueva) {
        this.piezas = this.piezas.filter(pieza => pieza.id !== piezaSold.id);
    }
    generateFechasVentas() {
        this.fechasVentas = [];
        this.piezas.forEach(pieza => {
            const fechaTransformada = this.generarFechaSold(pieza);
            if (!this.fechasVentas.find(fecha => fecha === fechaTransformada)) {
                this.fechasVentas.push(this.datePipe.transform(this.dateformatted(pieza.dateSold), "dd/MM/yyyy")!);
            }
        });
    }

    dateformatted(dateSold: Nullable<Timestamp>) {
        return dateSold ? dateSold.toDate() : "";
    }

    getTotalFormPaymentMethod(paymentMethod: PaymentMethods) {
        return this.piezas.reduce(
            (accumulator, pieza) => {
                const fechaTransformada = this.generarFechaSold(pieza);
                if (pieza.paymentMethod === paymentMethod && (this.fechaFiltro === "all" || fechaTransformada === this.fechaFiltro)) {
                    accumulator += pieza.price;
                }
                return accumulator;
            }, 0,);
    }
    generarFechaSold(pieza: Pieza) {
        return this.datePipe.transform(this.dateformatted(pieza.dateSold), "dd/MM/yyyy") ?? "";
    }

    getTotalPorFecha() {
        return this.piezas.reduce(
            (accumulator, pieza) => {
                const fechaTransformada = this.generarFechaSold(pieza);
                if (this.fechaFiltro === "all" || fechaTransformada === this.fechaFiltro) {
                    accumulator += pieza.price;
                }
                return accumulator;
            }, 0);
    }

    clearFilters() {
        this.fechaFiltro = "all";
    }

    sortPiezas(field: keyof Pieza) {
        const order = this.sortFieldPieza === field ? 1 : -1;
        this.sortFieldPieza = field;
        this.piezas = sortArray<Pieza>(this.piezas, field, order);

    }
}
