import { Component } from '@angular/core';
import { PiezasService } from "../../../../core/services/piezas.service";
import { Pieza } from "../../../../shared/models/pieza.interface";
import { Timestamp } from "firebase/firestore";
import { Nullable } from "../../../../shared/helpers/Nullable.interface";

@Component({
    selector: 'app-sold',
    templateUrl: './sold.component.html',
    styleUrl: './sold.component.css'
})
export class SoldComponent {
    piezas: Pieza[] = [];

    loading = false;
    constructor(
        private piezasService: PiezasService,
    ) { }

    async ngOnInit() {
        await this.getAllPiezas();
    }

    async getAllPiezas() {
        try {
            this.loading = true;
            this.piezas = (await this.piezasService.getByQuery("isSold", true)).sort((a, b) => a.dateSold! < b.dateSold! ? 1 : -1);
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

    dateformatted(dateSold: Nullable<Timestamp>) {
        return dateSold ? dateSold.toDate() : "";
    }
}
