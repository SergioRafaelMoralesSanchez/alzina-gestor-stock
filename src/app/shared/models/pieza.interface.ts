import { Timestamp } from "firebase/firestore";
import { Nullable } from "../helpers/Nullable.interface";

export interface Pieza {
    id: string
    name: string
    type: string
    isSold: boolean
    dateSold: Nullable<Timestamp>
    price: number
    coments: string
    paymentMethod: "Metalico" | "Bizum" | "A Deber" | string
}
export interface PiezaSold extends Pieza {
    dateSold:Timestamp
}