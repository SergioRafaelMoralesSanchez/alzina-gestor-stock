import { Component, OnInit } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { PiezasService } from "../../../../core/services/piezas.service";
import { TipoPiezasService } from "../../../../core/services/tipo-piezas.service";
import { Pieza } from "../../../../shared/models/pieza.interface";
import { TipoPieza } from "../../../../shared/models/tipo-pieza.interface";

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
    piezas: Pieza[] = [];
    piezasRaw: Pieza[] = [];

    tipos: TipoPieza[] = [];
    tipoPiezaFiltro: string = "";
    nombreFiltro: string = "";

    constructor(
        private piezasService: PiezasService,
        private tipoPiezasService: TipoPiezasService
    ) { }

    async ngOnInit() {
        this.tipos = await this.tipoPiezasService.getAll();

        await this.getAllPiezas();

    }

    async getAllPiezas() {
        this.piezasRaw = await this.piezasService.getByQuery("isSold", false);
        this.piezas = [...this.piezasRaw];
    }
    async soldPieza(index: number) {
        console.log("🚀 ~ file: stock.component.ts:33 ~ StockComponent ~ soldPieza ~ index:", index);
        console.log();
        const piezaSold: Pieza = {
            ...this.piezas[index],
            isSold: true,
            dateSold: Timestamp.fromDate(new Date())
        };
        await this.piezasService.updateDoc(piezaSold.id, piezaSold as Pieza);
        await this.getAllPiezas();
    }
    cleanFilters() {
        this.tipoPiezaFiltro = "";
        this.nombreFiltro = "";
        this.piezas = [...this.piezasRaw];
    }

    onChangeTipoPieza() {
        if (this.tipoPiezaFiltro === '') {
            this.piezas = [...this.piezasRaw];
        } else {
            this.piezas = this.piezasRaw.filter(pieza => pieza.type === this.tipoPiezaFiltro);
        }
    }

    onChangeNombreFiltro() {
        console.log("🚀 ~ file: stock.component.ts:42 ~ StockComponent ~ onChangeNombreFiltro ~ this.nombreFiltro:", this.nombreFiltro);
        if (this.nombreFiltro === '') {
            this.piezas = [...this.piezasRaw];
        } else {
            this.piezas = this.piezasRaw.filter(pieza => {
                console.log("🚀 ~ file: stock.component.ts:47 ~ StockComponent ~ onChangeNombreFiltro ~ pieza.name:", pieza.name);
                return pieza.name.toLowerCase().includes(this.nombreFiltro.toLowerCase());
            });
        }
    }

}
