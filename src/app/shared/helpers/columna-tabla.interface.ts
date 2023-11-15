export interface ColumnaTabla<T> {
    name: keyof T,
    filterName?: string,
    tipo: tipoColumna,
    translation: string
}
export type tipoColumna = "id" |
    "string" |
    "number" |
    "Date" |
    "json" |
    "relatedTable" |
    "action" |
    "id-object" |
    "object-country" |
    "object-university" |
    "object-study" |
    "object-periodicity" |
    "object-currency" |
    "id-country" |
    "id-university" |
    "id-study" |
    "id-periodicity" |
    "id-currency" |
    "id-tipoOperacion" |
    "id-countryUniversityCurrency" |
    "object-tipoOperacion" |
    "object-countryUniversityCurrency"