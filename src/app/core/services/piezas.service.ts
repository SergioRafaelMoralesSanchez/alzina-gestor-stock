import { Injectable } from '@angular/core';

import { PiezaNueva } from "../../shared/models/pieza.interface";
import { BaseService } from "./base-service.service";

@Injectable({
    providedIn: 'root'
})
export class PiezasService extends BaseService<PiezaNueva>{

    constructor() {
        super();
        this.collectionName = "piezas";
    }

}
