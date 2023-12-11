import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { PiezasService } from "../../core/services/piezas.service";
import { TipoPiezasService } from "../../core/services/tipo-piezas.service";
import { SoldComponent } from "./pages/sold-page/sold.component";
import { SoldRoutingModule } from './sold-routing.module';
import { BuscadorPiezasComponent } from "../../shared/components/buscador-piezas/buscador-piezas.component";

@NgModule({
    declarations: [SoldComponent],
    imports: [
        CommonModule,
        FormsModule,
        SoldRoutingModule,
        BuscadorPiezasComponent
    ],
    providers: [
        PiezasService,
        TipoPiezasService,
        DatePipe,
    ]
})
export class SoldModule { }
