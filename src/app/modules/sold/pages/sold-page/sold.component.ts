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

    constructor(
        private piezasService: PiezasService,
    ) { }

    async ngOnInit() {
        await this.getAllPiezas();
    }

    async getAllPiezas() {
        this.piezas = await this.piezasService.getByQuery("isSold", true);
    }

    async unSoldPieza(index: number) {
        console.log("🚀 ~ file: stock.component.ts:33 ~ StockComponent ~ soldPieza ~ index:", index);
        console.log();
        const piezaSold: Pieza = {
            ...this.piezas[index],
            isSold: false,
            dateSold: null
        };
        await this.piezasService.updateDoc(piezaSold.id, piezaSold);
        await this.getAllPiezas();
    }

    dateformatted(dateSold: Nullable<Timestamp>  ) {
        return dateSold ? dateSold.toDate() : "";
    }
}
