import { Injectable } from '@angular/core';

import { TipoPieza } from "../../shared/models/tipo-pieza.interface";
import { BaseService } from "./base-service.service";

@Injectable({
    providedIn: 'root'
})
export class TipoPiezasService extends BaseService<TipoPieza>{

    constructor() {
        super();
        this.collectionName = "tipoPieza";
    }

}
