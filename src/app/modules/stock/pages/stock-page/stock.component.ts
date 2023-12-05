import { Component, OnInit } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { PiezasService } from "../../../../core/services/piezas.service";
import { Undefinable } from "../../../../shared/helpers/Undefinable.interface";
import { PaymentMethodsArray, Pieza } from "../../../../shared/models/pieza.interface";
import { TipoPieza } from "../../../../shared/models/tipo-pieza.interface";

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
    piezas: Pieza[] = [];
    piezasRaw: Pieza[] = [];
    currentPieza: Undefinable<Pieza>;

    paymentMethods = PaymentMethodsArray;

    tipos: TipoPieza[] = [];
    tipoPiezaFiltro: string = "";
    nombreFiltro: string = "";

    showModal = false;
    loading = false;

    constructor(
        private piezasService: PiezasService
    ) { }

    async ngOnInit() {
        await this.getAllPiezas();
        this.piezas.forEach(pieza => {
            const index = this.tipos.findIndex(tipo => tipo.name === pieza.type);
            if (index === -1) {
                this.tipos.push({
                    id: "",
                    name: pieza.type,
                    numPiezas: 1
                });
            } else {
                this.tipos[index].numPiezas += 1;
            }
        });
    }

    showModalVenderPieza(index: number) {
        this.showModal = true;
        this.currentPieza = { ... this.piezas[index], paymentMethod: this.paymentMethods[0] };
    }

    async getAllPiezas() {
        this.loading = true;
        try {
            this.piezasRaw = await this.piezasService.getByQuery("isSold", false);
        } catch (error) {
            alert(error);
        } finally {
            this.loading = false;
        }
        this.applyFilters();
    }

    async soldPieza() {
        if (this.currentPieza) {
            const piezaSold: Pieza = {
                ...this.currentPieza,
                isSold: true,
                dateSold: Timestamp.fromDate(new Date())
            };
            await this.piezasService.updateDoc(piezaSold.id, piezaSold as Pieza);
            this.showModal = false;
            this.eliminatePieza(piezaSold);
            // await this.getAllPiezas();
        }
    }

    eliminatePieza(piezaSold: Pieza) {
        this.piezas = this.piezas.filter(pieza => pieza.id !== piezaSold.id);
    }

    clearFilters() {
        this.tipoPiezaFiltro = "";
        this.nombreFiltro = "";
        this.piezas = [...this.piezasRaw];
    }

    applyFilters() {
        this.piezas = [...this.piezasRaw];
        this.onChangeTipoPieza();
        this.onChangeNombreFiltro();
    }

    onChangeTipoPieza() {
        if (this.tipoPiezaFiltro !== '') {
            this.piezas = this.piezas.filter(pieza => pieza.type === this.tipoPiezaFiltro);
        }
    }

    onChangeNombreFiltro() {
        if (this.nombreFiltro !== '') {
            this.piezas = this.piezas.filter(pieza => pieza.name.toLowerCase().includes(this.nombreFiltro.toLowerCase()));
        }
    }

}
