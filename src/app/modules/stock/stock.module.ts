import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { PiezasService } from "../../core/services/piezas.service";
import { StockComponent } from "./pages/stock-page/stock.component";
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
    declarations: [StockComponent],
    imports: [
        CommonModule,
        FormsModule,
        StockRoutingModule
    ],
    providers: [
        PiezasService
    ]
})
export class StockModule { }
