import { Component, OnInit } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { PiezasService } from "../../../../core/services/piezas.service";
import { TipoPiezasService } from "../../../../core/services/tipo-piezas.service";
import { sortArray } from "../../../../shared/components/utils/utils";
import { Nullable } from "../../../../shared/helpers/Nullable.interface";
import { PaymentMethodsArray, Pieza, } from "../../../../shared/models/pieza.interface";
import { TipoPieza } from "../../../../shared/models/tipo-pieza.interface";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    piezas: Pieza[] = [];
    piezasRaw: Pieza[] = [];

    isEditMode = false;
    isEditModeTipo = false;
    nuevaPieza: Pieza = {
        id: "",
        name: "",
        type: "",
        isSold: false,
        dateSold: null,
        price: 0,
        coments: "",
        paymentMethod: PaymentMethodsArray[0]
    };
    numeroPiezas = 1;

    tiposPieza: TipoPieza[] = [];
    nuevoTipoPieza: TipoPieza = {
        id: "",
        name: "",
        numPiezas: 1
    };
    sortFieldPieza = "";
    sortFieldTipoPieza = "";

    tipoPiezaFiltro: string = "";
    nombreFiltro: string = "";

    constructor(
        private piezasService: PiezasService,
        private tipoPiezasService: TipoPiezasService
    ) {

    }
    async ngOnInit() {

        await this.getAllTiposPiezas();
        await this.getAllPiezas();
    }

    //filtros

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

    async getAllPiezas() {
        this.piezasRaw = (await this.piezasService.getAll()).sort((a, b) => a.name < b.name ? -1 : 1);

        this.piezas = [...this.piezasRaw];
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
                price: 0,
                coments: "",
                paymentMethod: PaymentMethodsArray[0]
            };
            await this.getAllPiezas();
        }
    }
    async updatePieza() {
        if (this.checkFormNuevaPieza()) {

            await this.piezasService.updateDoc(this.nuevaPieza.id, this.nuevaPieza);
            this.numeroPiezas = 1;
            this.isEditMode = false;
            this.nuevaPieza = {
                id: "",
                name: "",
                type: "",
                isSold: false,
                dateSold: null,
                price: 0,
                coments: "",
                paymentMethod: PaymentMethodsArray[0]
            };
            await this.getAllPiezas();
        }
    }

    async eliminarPieza(pieza: Pieza) {

        await this.piezasService.deleteDoc(pieza.id);
        await this.getAllPiezas();
    }

    async editarPieza(pieza: Pieza) {
        this.isEditMode = true;
        this.nuevaPieza = { ...pieza };
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
        this.tiposPieza = (await this.tipoPiezasService.getAll()).sort((a, b) => a.name < b.name ? -1 : 1);
    }

    async saveNuevoTipoPieza() {
        if (this.checkFormNuevoTipoPieza()) {
            await this.tipoPiezasService.addDoc(this.nuevoTipoPieza);
            this.nuevoTipoPieza = {
                id: "",
                name: "",
                numPiezas: 1
            };
            await this.getAllTiposPiezas();
        }
    }
    async updateTipoPieza() {
        if (this.checkFormNuevoTipoPieza()) {

            await this.tipoPiezasService.updateDoc(this.nuevoTipoPieza.id, this.nuevoTipoPieza);
            this.isEditModeTipo = false;
            this.nuevoTipoPieza = {
                id: "",
                name: "",
                numPiezas: 1
            };
            await this.getAllTiposPiezas();
        }
    }
    async editarTipoPieza(tipoPieza: TipoPieza) {
        this.isEditModeTipo = true;
        this.nuevoTipoPieza = { ...tipoPieza };
    }

    async eliminarTipoPieza(tipo: TipoPieza) {

        await this.tipoPiezasService.deleteDoc(tipo.id);
        await this.getAllTiposPiezas();
    }

    checkFormNuevoTipoPieza() {
        return !!this.nuevoTipoPieza.name.length;
    }

    sortPiezas(field: keyof Pieza) {
        const order = this.sortFieldPieza === field ? 1 : -1;
        this.sortFieldPieza = field;
        this.piezas = sortArray<Pieza>(this.piezas, field, order);

    }

    sortTipoPiezas(field: keyof TipoPieza) {
        const order = this.sortFieldTipoPieza === field ? 1 : -1;
        this.sortFieldTipoPieza = field;
        this.tiposPieza = sortArray<TipoPieza>(this.tiposPieza, field, order);
    }

}
