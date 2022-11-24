export interface FormInfo {
    form: HTMLElement
    info: HTMLCollectionOf<HTMLInputElement>
    values: HTMLCollectionOf<HTMLSpanElement>
    btn: HTMLElement
    copy: HTMLElement
    product: HTMLElement
    type: HTMLElement
    weight: HTMLElement
    size: HTMLElement
    shape: HTMLElement
    color: HTMLElement
    hardness: HTMLElement
    quantity: HTMLElement
    origin: HTMLElement
    treatment: HTMLElement
    unh: HTMLElement
    en: HTMLElement
    es: HTMLElement
    cat: HTMLElement
}

export interface GemInfo {
    id: HTMLInputElement
    price: HTMLInputElement
    quantity: HTMLInputElement
    name: HTMLInputElement
    nameWeight: HTMLInputElement
}
