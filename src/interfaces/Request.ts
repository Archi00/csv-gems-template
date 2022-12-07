export interface HeaderData {
  [key: string]: string
}

export interface RequestData {
  method?: string,
  mode?: string,
  cache?: string,
  credentials?: string,
  headers?: HeaderData,
  redirect?: string,
  referrerPolicy?: string,
  body?: string
}