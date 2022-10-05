export interface TranslationsItems {
    [key: string]: string | any
}
export interface TranslationsLang {
    en: TranslationsItems
    es: TranslationsItems
    cat: TranslationsItems
}
export interface TranslationsProp {
    [key: string]: TranslationsItems
}

export interface TranslationsConfig {
    name: TranslationsLang
    cut: TranslationsLang
    color: TranslationsLang
}
