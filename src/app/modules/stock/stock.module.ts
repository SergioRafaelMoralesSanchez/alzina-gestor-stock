import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { PiezasService } from "../../core/services/piezas.service";
import { StockComponent } from "./pages/stock-page/stock.component";
import { StockRoutingModule } from './stock-routing.module';
import { BuscadorPiezasComponent } from "../../shared/components/buscador-piezas/buscador-piezas.component";

@NgModule({
    declarations: [StockComponent],
    imports: [
        CommonModule,
        FormsModule,
        StockRoutingModule,
        BuscadorPiezasComponent
    ],
    providers: [
        PiezasService
    ]
})
export class StockModule { }
