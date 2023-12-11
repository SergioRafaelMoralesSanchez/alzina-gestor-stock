import { Component, OnInit } from '@angular/core';
import { PiezasService } from "../../../../core/services/piezas.service";
import { TipoPiezasService } from "../../../../core/services/tipo-piezas.service";
import { PiezaNueva } from "../../../../shared/models/pieza.interface";
import { Database } from "./database";

@Component({
    selector: 'app-dashboard',
    templateUrl: './pruebas.component.html',
})
export class PruebasComponent implements OnInit {

    constructor(
        private piezasService: PiezasService,
        private tipoPiezasService: TipoPiezasService
    ) {

    }
    async ngOnInit() {

        // await this.getAllTiposPiezas();
        this.conver();
    }

    piezasNuevas: PiezaNueva[] = [];
    async conver() {
        const idsEliminar: string[] = [];
        // Database.forEach(pieza => {
        //     const index = this.piezasNuevas.findIndex(piezaFind => piezaFind.name.trim() === pieza.name.trim());
        //     if (index === -1) {
        //         if (pieza.isSold) {
        //             this.piezasNuevas.push({
        //                 id: "",
        //                 name: pieza.name,
        //                 price: pieza.price,
        //                 type: pieza.type,
        //                 stock: 0,
        //                 ventas: [
        //                 //     {
        //                 //     dateSold: pieza.dateSold && new Timestamp(pieza.dateSold?.seconds, pieza.dateSold?.nanoseconds),
        //                 //     coments: pieza.coments,
        //                 //     paymentMethod: pieza.paymentMethod as PaymentMethods,
        //                 // }
        //             ]
        //             });
        //         } else {

        //             // idsEliminar.push(pieza.id);
        //             this.piezasNuevas.push({
        //                 id: "",
        //                 name: pieza.name,
        //                 price: pieza.price,
        //                 type: pieza.type,
        //                 stock: 1,
        //                 ventas: []
        //             });
        //         }
        //     } else {
        //         idsEliminar.push(pieza.id);
        //         this.piezasNuevas[index].stock += 1;
        //         if (pieza.isSold) {
        //             this.piezasNuevas[index].stock -= 1;
        //             // this.piezasNuevas[index].ventas.push({
        //             //     dateSold: pieza.dateSold ? new Timestamp(pieza.dateSold.seconds, pieza.dateSold.nanoseconds) : null,
        //             //     coments: pieza.coments,
        //             //     paymentMethod: pieza.paymentMethod as PaymentMethods,
        //             // });
        //         }
        //     }
        // });
        console.log("🚀 ~ file: pruebas.component.ts:27 ~ PruebasComponent ~ conver ~ piezasNuevas:", Database);
        console.log("🚀 ~ file: pruebas.component.ts:27 ~ PruebasComponent ~ conver ~ piezasNuevas:", this.piezasNuevas);
        console.log("🚀 ~ file: pruebas.component.ts:27 ~ PruebasComponent ~ conver ~ piezasNuevas:", idsEliminar);

        // for (const pieza of this.piezasNuevas) {
        //     console.log("🚀 ~ file: pruebas.component.ts:74 ~ PruebasComponent ~ conver ~ pieza:", pieza);
        //     await this.updatePieza(pieza);

        // }
        // console.log("TODAS LAS PIEZAS ACTUALIZADAS");
        // for (const id of idsEliminar) {
        //     console.log("🚀 ~ file: pruebas.component.ts:79 ~ PruebasComponent ~ conver ~ id:", id);
        //     await this.deletePieza(id);
        // }
        // console.log("TODAS LAS PIEZAS Eliminadas");

        // const pieza: PiezaNueva = {
        //     "name": "Portavelas Piramide",
        //     "type": "Portavelas",
        //     "ventas": [
        //         {
        //             "dateSold": new Timestamp(1701544142, 48000000),
        //             coments: "",
        //             paymentMethod: "Metalico"
        //         },
        //         {
        //             "dateSold": new Timestamp(1701544379, 487000000),
        //             coments: "",
        //             paymentMethod: "Metalico"
        //         }
        //     ],
        //     "stock": 0,
        //     "price": 12,
        //     "id": "uKTNZCC55aoFSkUZedaU"
        // };
        // this.updatePieza(pieza);

    }
    async updatePieza(nuevaPieza: PiezaNueva) {

        await this.piezasService.updateDoc(nuevaPieza.id, nuevaPieza);

    }
    async deletePieza(id: string) {

        await this.piezasService.deleteDoc(id);

    }
}
