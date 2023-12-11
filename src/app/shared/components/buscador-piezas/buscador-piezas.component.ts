import { CommonModule } from "@angular/common";
import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PiezaNueva } from "../../models/pieza.interface";
import { TipoPieza } from "../../models/tipo-pieza.interface";

@Component({
    selector: 'buscador-piezas',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    templateUrl: './buscador-piezas.component.html',
    styleUrl: './buscador-piezas.component.css'
})
export class BuscadorPiezasComponent implements OnInit {
    @Input()
    piezas: PiezaNueva[] = [];

    @Output()
    piezasChange = new EventEmitter<PiezaNueva[]>();

    piezasRaw: PiezaNueva[] = [];

    tiposPieza: TipoPieza[] = [];

    tipoPiezaFiltro: string = "";
    nombreFiltro: string = "";

    async ngOnInit() {
        this.piezasRaw = [...this.piezas];
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

    clearFilters() {
        this.tipoPiezaFiltro = "";
        this.nombreFiltro = "";
        this.piezas = [...this.piezasRaw];
        this.piezasChange.emit(this.piezas);
    }

    applyFilters() {
        this.piezas = [...this.piezasRaw];
        this.onChangeTipoPieza();
        this.onChangeNombreFiltro();
        this.piezasChange.emit(this.piezas);
    }

    onChangeTipoPieza() {
        if (this.tipoPiezaFiltro !== '') {
            this.piezas = this.piezas.filter(pieza => pieza.type === this.tipoPiezaFiltro);
        }
    }

    onChangeNombreFiltro() {
        if (this.nombreFiltro !== '') {
            this.piezas = this.piezas.filter(pieza =>
                pieza.name
                    .normalize('NFD')
                    .replace(/\p{Diacritic}/gu, '')
                    .toLowerCase().includes(this.nombreFiltro.toLowerCase()));
        }
    }

}
