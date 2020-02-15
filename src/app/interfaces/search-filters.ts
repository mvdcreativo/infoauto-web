export interface SearchFilters {
    category?:string;
    brand?:string;
    model?:string;
    pricemin?:number;
    pricemax?:number;
    yearmin?:number;
    yearmax?:number;
    price?:number;
    year?:number;
    attribute?:any;
    condition?:any;
    limit_page?:number;
    user_id?:number;
    user: string;
    page: number;
    kms?: number;
}

export interface ParamsUrl {
    brand:any;
    model:any;
    year:any;
    price:any
}