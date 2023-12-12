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

    constructor(
        private piezasService: PiezasService,
        private tipoPiezasService: TipoPiezasService
    ) {

    }
    async ngOnInit() {
        await this.getAllPiezas();
        await this.getAllTiposPiezas();
    }

    async getAllPiezas() {
        this.loading = true;
        try {
            this.piezas = (await this.piezasService.getAll()).sort((a, b) => a.name < b.name ? -1 : 1);
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }

    }
    async savePieza() {
        if (this.checkFormNuevaPieza()) {

            const pieza = await this.piezasService.addDoc(this.nuevaPieza);
            if (pieza) {
                this.piezas.push(pieza);
                this.piezas.sort((a, b) => a.name < b.name ? -1 : 1);
            }
            this.nuevaPieza = {
                id: "",
                name: "",
                type: "",
                price: 0,
                stock: 1,
                ventas: []
            };
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
        }
    }

    async eliminarPieza(piezaEliminar: PiezaNueva) {
        await this.piezasService.deleteDoc(piezaEliminar.id);
        this.piezas = this.piezas.filter(pieza => pieza.id !== piezaEliminar.id);
    }

    async editarPieza(pieza: PiezaNueva) {
        this.isEditMode = true;
        this.nuevaPieza = pieza;
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
        this.tiposPieza = (await this.tipoPiezasService.getAll()).sort((a, b) => a.name < b.name ? -1 : 1);
    }

    async saveNuevoTipoPieza() {
        if (this.checkFormNuevoTipoPieza()) {
            const tipoPieza = await this.tipoPiezasService.addDoc(this.nuevoTipoPieza);
            if (tipoPieza) {
                this.tiposPieza.push(tipoPieza);
                this.tiposPieza = this.tiposPieza.sort((a, b) => a.name < b.name ? -1 : 1);
            }
            this.nuevoTipoPieza = {
                id: "",
                name: "",
                numPiezas: 1
            };

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
        }
    }
    async editarTipoPieza(tipoPieza: TipoPieza) {
        this.isEditModeTipo = true;
        this.nuevoTipoPieza = tipoPieza;
    }

    async eliminarTipoPieza(tipoEliminar: TipoPieza) {
        await this.tipoPiezasService.deleteDoc(tipoEliminar.id);
        this.tiposPieza = this.tiposPieza.filter(tipo => tipo.id !== tipoEliminar.id);
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
