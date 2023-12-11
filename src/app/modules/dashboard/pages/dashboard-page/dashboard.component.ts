import { Component, OnInit } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { PiezasService } from "../../../../core/services/piezas.service";
import { TipoPiezasService } from "../../../../core/services/tipo-piezas.service";
import { sortArray } from "../../../../shared/components/utils/utils";
import { Nullable } from "../../../../shared/helpers/Nullable.interface";
import { PiezaNueva } from "../../../../shared/models/pieza.interface";
import { TipoPieza } from "../../../../shared/models/tipo-pieza.interface";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    piezas: PiezaNueva[] = [];
    piezasRaw: PiezaNueva[] = [];

    loading = false;

    isEditMode = false;
    isEditModeTipo = false;
    nuevaPieza: PiezaNueva = {
        id: "",
        name: "",
        type: "",
        price: 0,
        stock: 1,
        ventas: []
    };

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

        await this.getAllPiezas();
        await this.getAllTiposPiezas();
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
        this.loading = true;
        try {
            this.piezasRaw = (await this.piezasService.getAll()).sort((a, b) => a.name < b.name ? -1 : 1);
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }

        this.piezas = [...this.piezasRaw];
    }
    async savePieza() {
        if (this.checkFormNuevaPieza()) {

            await this.piezasService.addDoc(this.nuevaPieza);
            this.nuevaPieza = {
                id: "",
                name: "",
                type: "",
                price: 0,
                stock: 1,
                ventas: []
            };
            await this.getAllPiezas();
        }
    }
    async updatePieza() {
        if (this.checkFormNuevaPieza()) {

            await this.piezasService.updateDoc(this.nuevaPieza.id, this.nuevaPieza);
            this.isEditMode = false;
            this.nuevaPieza = {
                id: "",
                name: "",
                type: "",
                price: 0,
                stock: 1,
                ventas: []
            };
            await this.getAllPiezas();
        }
    }

    async eliminarPieza(pieza: PiezaNueva) {

        await this.piezasService.deleteDoc(pieza.id);
        await this.getAllPiezas();
    }

    async editarPieza(pieza: PiezaNueva) {
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
     * Tipos PiezaNueva
     */

    async getAllTiposPiezas() {
        this.tiposPieza = (await this.tipoPiezasService.getAll()).map(tipo => ({
            id: tipo.id,
            name: tipo.name,
            numPiezas: 0,
        })).sort((a, b) => a.name < b.name ? -1 : 1);
        this.calculateTiposPiezas();
    }
    calculateTiposPiezas() {
        this.piezas.forEach(pieza => {
            const index = this.tiposPieza.findIndex(tipo => tipo.name === pieza.type);
            if (index === -1) {
                this.tiposPieza.push({
                    id: "",
                    name: pieza.type,
                    numPiezas: 1
                });
            } else {
                this.tiposPieza[index].numPiezas += 1;
            }
        });
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

    sortPiezas(field: keyof PiezaNueva) {
        const order = this.sortFieldPieza === field ? 1 : -1;
        this.sortFieldPieza = field;
        this.piezas = sortArray<PiezaNueva>(this.piezas, field, order);

    }

    sortTipoPiezas(field: keyof TipoPieza) {
        const order = this.sortFieldTipoPieza === field ? 1 : -1;
        this.sortFieldTipoPieza = field;
        this.tiposPieza = sortArray<TipoPieza>(this.tiposPieza, field, order);
    }

}
