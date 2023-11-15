import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./pages/dashboard-page/dashboard.component";
import { FormsModule } from "@angular/forms";
import { PiezasService } from "../../core/services/piezas.service";
import { TipoPiezasService } from "../../core/services/tipo-piezas.service";
import { StockRoutingModule } from "../stock/stock-routing.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,

        FormsModule,
        StockRoutingModule
    ],
    providers: [
        PiezasService,
        TipoPiezasService
    ]
})
export class DashboardModule { }
