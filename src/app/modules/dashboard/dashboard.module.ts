import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./pages/dashboard-page/dashboard.component";
import { FormsModule } from "@angular/forms";
import { PiezasService } from "../../core/services/piezas.service";
import { TipoPiezasService } from "../../core/services/tipo-piezas.service";
import { StockRoutingModule } from "../stock/stock-routing.module";
import { PruebasComponent } from "./pages/pruebas/pruebas.component";
import { BuscadorPiezasComponent } from "../../shared/components/buscador-piezas/buscador-piezas.component";

@NgModule({
    declarations: [
        DashboardComponent,
        PruebasComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        BuscadorPiezasComponent,
        FormsModule,
        StockRoutingModule
    ],
    providers: [
        PiezasService,
        TipoPiezasService
    ]
})
export class DashboardModule { }
