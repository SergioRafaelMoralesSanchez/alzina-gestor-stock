import { Injectable } from '@angular/core';

import { Pieza } from "../../shared/models/pieza.interface";
import { BaseService } from "./base-service.service";

@Injectable({
    providedIn: 'root'
})
export class PiezasService extends BaseService<Pieza>{

    constructor() {
        super();
        this.collectionName = "piezas";
    }

}
