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
    paymentMethod: PaymentMethods
}
export const PaymentMethodsArray : PaymentMethods[] = ["Metalico", "Bizum", "A Deber", "Otro"];
export type PaymentMethods = "Metalico" | "Bizum" | "A Deber" | "Otro"
export interface PiezaSold extends Pieza {
    dateSold: Timestamp
}