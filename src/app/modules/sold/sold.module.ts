import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { PiezasService } from "../../core/services/piezas.service";
import { TipoPiezasService } from "../../core/services/tipo-piezas.service";
import { SoldComponent } from "./pages/sold-page/sold.component";
import { SoldRoutingModule } from './sold-routing.module';

@NgModule({
    declarations: [SoldComponent],
    imports: [
        CommonModule,
        FormsModule,
        SoldRoutingModule
    ],
    providers: [
        PiezasService,
        TipoPiezasService,
        DatePipe
    ]
})
export class SoldModule { }
