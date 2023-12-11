import { Timestamp } from "firebase/firestore";
export type PiezaBase = {
    id: string
    name: string
    type: string
    price: number
}

export interface Pieza extends PiezaBase {
    dateSold: Timestamp
    coments: string
    paymentMethod: PaymentMethods
}
export const PaymentMethodsArray: PaymentMethods[] = ["Metalico", "Bizum", "A Deber", "Otro"];
export type PaymentMethods = "Metalico" | "Bizum" | "A Deber" | "Otro"

export interface PiezaNueva extends PiezaBase {
    stock: number
    ventas: Venta[]
}
export interface Venta {
    dateSold: Timestamp
    coments: string
    paymentMethod: PaymentMethods
}