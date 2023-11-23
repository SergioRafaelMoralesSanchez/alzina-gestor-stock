import { Component } from '@angular/core';
import { PiezasService } from "../../../../core/services/piezas.service";
import { PaymentMethods, PaymentMethodsArray, Pieza } from "../../../../shared/models/pieza.interface";
import { Timestamp } from "firebase/firestore";
import { Nullable } from "../../../../shared/helpers/Nullable.interface";
import { DatePipe } from "@angular/common";
import { sortArray } from "../../../../shared/components/utils/utils";

@Component({
    selector: 'app-sold',
    templateUrl: './sold.component.html',
    styleUrl: './sold.component.css'
})
export class SoldComponent {
    fechaFiltro = this.datePipe.transform(new Date(), "dd/MM/yyyy");
    fechasVentas: string[] = [];
    piezas: Pieza[] = [];

    paymentMethods = PaymentMethodsArray;

    loading = false;

    sortFieldPieza = "";
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
            this.piezas = (await this.piezasService.getByQuery("isSold", true)).sort((a, b) => a.dateSold! < b.dateSold! ? 1 : -1);
            this.generateFechasVentas();
        } catch (error) {
            alert(error);
        } finally {
            this.loading = false;
        }

    }

    async unSoldPieza(index: number) {
        const piezaSold: Pieza = {
            ...this.piezas[index],
            isSold: false,
            dateSold: null
        };
        await this.piezasService.updateDoc(piezaSold.id, piezaSold);
        await this.getAllPiezas();
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
                if (pieza.paymentMethod === paymentMethod && fechaTransformada === this.fechaFiltro) {
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
                if (fechaTransformada === this.fechaFiltro) {
                    accumulator += pieza.price;
                }
                return accumulator;
            }, 0);
    }

    clearFilters() {
        this.fechaFiltro = this.datePipe.transform(new Date(), "dd/MM/yyyy");
    }

    sortPiezas(field: keyof Pieza) {
        const order = this.sortFieldPieza === field ? 1 : -1;
        this.sortFieldPieza = field;
        this.piezas = sortArray<Pieza>(this.piezas, field, order);

    }
}
