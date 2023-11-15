import { Component, OnInit } from '@angular/core';
import { PiezasService } from "../../../../core/services/piezas.service";
import { TipoPiezasService } from "../../../../core/services/tipo-piezas.service";
import { Pieza } from "../../../../shared/models/pieza.interface";
import { TipoPieza } from "../../../../shared/models/tipo-pieza.interface";
import { Timestamp } from "firebase/firestore";
import { Nullable } from "../../../../shared/helpers/Nullable.interface";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    piezas: Pieza[] = [];
    nuevaPieza: Pieza = {
        id: "",
        name: "",
        type: "",
        isSold: false,
        dateSold: null,
        price: 0
    };
    numeroPiezas = 1;

    tiposPieza: TipoPieza[] = [];
    nuevoTipoPieza: TipoPieza = {
        id: "",
        name: ""
    };
    constructor(
        private piezasService: PiezasService,
        private tipoPiezasService: TipoPiezasService
    ) {

    }
    async ngOnInit() {

        await this.getAllTiposPiezas();
        await this.getAllPiezas();
        console.log("🚀 ~ file: stock.component.ts:41 ~ StockComponent ~ ngOnInit ~ this.piezas:", this.piezas);
    }

    async getAllPiezas() {
        this.piezas = await this.piezasService.getAll();
    }
    async savePieza() {
        if (this.checkFormNuevaPieza()) {

            for (let index = 0; index < this.numeroPiezas; index++) {
                await this.piezasService.addDoc(this.nuevaPieza);
            }
            this.numeroPiezas = 1;
            this.nuevaPieza = {
                id: "",
                name: "",
                type: "",
                isSold: false,
                dateSold: null,
                price: 0
            };
            await this.getAllPiezas();
        }
    }
    async eliminarPieza(pieza: Pieza) {

        await this.piezasService.deleteDoc(pieza.id);
        await this.getAllPiezas();
    }

    checkFormNuevaPieza() {
        return !!this.nuevaPieza.name.length && !!this.nuevaPieza.type.length && this.nuevaPieza.price !== 0;
    }

    dateformatted(dateSold: Nullable<Timestamp>) {
        return dateSold ? dateSold.toDate() : "";
    }

    /**
     * Tipos Pieza
     */

    async getAllTiposPiezas() {
        this.tiposPieza = await this.tipoPiezasService.getAll();
    }

    async saveNuevoTipoPieza() {
        if (this.checkFormNuevoTipoPieza()) {
            await this.tipoPiezasService.addDoc(this.nuevoTipoPieza);
            this.nuevoTipoPieza = {
                id: "",
                name: ""
            };
            await this.getAllTiposPiezas();
        }
    }

    async eliminarTipoPieza(tipo: TipoPieza) {

        await this.tipoPiezasService.deleteDoc(tipo.id);
        await this.getAllTiposPiezas();
    }

    checkFormNuevoTipoPieza() {
        return !!this.nuevoTipoPieza.name.length;
    }

}
