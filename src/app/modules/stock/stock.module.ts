import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StockRoutingModule } from './stock-routing.module';
import { PiezasService } from "../../core/services/piezas.service";
import { FormsModule } from "@angular/forms";
import { StockComponent } from "./pages/stock-page/stock.component";
import { TipoPiezasService } from "../../core/services/tipo-piezas.service";

@NgModule({
    declarations: [StockComponent],
    imports: [
        CommonModule,
        FormsModule,
        StockRoutingModule
    ],
    providers: [
        PiezasService,
        TipoPiezasService
    ]
})
export class StockModule { }
