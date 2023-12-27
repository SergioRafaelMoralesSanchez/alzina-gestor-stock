import { Component, OnInit } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { PiezasService } from "../../../../core/services/piezas.service";
import { Undefinable } from "../../../../shared/helpers/Undefinable.interface";
import { PaymentMethodsArray, PiezaNueva, Venta } from "../../../../shared/models/pieza.interface";

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
    piezas: PiezaNueva[] = [];

    currentPieza: Undefinable<PiezaNueva>;
    currentVenta: Undefinable<Venta>;
    currentStockVender: number[] = [];
    currentStockVenderNumer: number = 1;
    paymentMethods = PaymentMethodsArray;

    showModal = false;
    loading = false;

    constructor(
        private piezasService: PiezasService
    ) { }

    async ngOnInit() {
        await this.getAllPiezas();

    }

    showModalVenderPieza(index: number) {
        this.showModal = true;
        this.currentPieza = this.piezas[index];
        this.currentStockVender = Array.from({ length: this.currentPieza.stock }, (_, i) => i + 1);
        this.currentStockVenderNumer = 1;
        this.currentVenta = {
            dateSold: Timestamp.fromDate(new Date()),
            coments: "",
            paymentMethod: this.paymentMethods[0]
        };
    }

    async getAllPiezas() {
        this.loading = true;
        try {
            this.piezas = (await this.piezasService.getByQuery("stock", 0, "!="))
                .sort((a, b) => a.name < b.name ? -1 : 1);
        } catch (error) {
            alert(error);
        } finally {
            this.loading = false;
        }
    }

    async soldPieza() {
        if (this.currentPieza && this.currentVenta) {
            this.currentPieza.stock -= this.currentStockVenderNumer;
            for (let i = 0; i < this.currentStockVenderNumer; i++) {
                this.currentPieza.ventas.push(this.currentVenta);
            }
            await this.piezasService.updateDoc(this.currentPieza.id, this.currentPieza);
            this.showModal = false;
            if (this.currentPieza.stock === 0) {
                this.eliminatePieza(this.currentPieza);
            }
        }
    }

    eliminatePieza(piezaSold: PiezaNueva) {
        this.piezas = this.piezas.filter(pieza => pieza.id !== piezaSold.id);
    }

}
