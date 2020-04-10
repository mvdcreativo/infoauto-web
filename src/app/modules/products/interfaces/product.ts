export interface Product {
    id?: number;
    description?: string;
    name_concat?: string;
    price?: number;
    state?: string;
    km?: number;
    year?: number;
    visit?: number;
    condition_id?: number;
    brand_id?: number;
    vehicle_category_id?: number;
    vehicle_model_id?: number;
    vehicle_sub_model_id?: number;
    city_id?: number;
    user_id?: number;
    price_condition_id?: number;
    tariff_id?: number;
    currency_id?: number;
    created_at?: string;
    updated_at?: string;
    attributes?: Attributes[];
    extras?: Extras[];
    images?: Images[];
    neighborhood_id?: number;
}

export interface Attributes {
    id: number;
    name: string;
    slug: string;
    image_id: number;
    attribute_id:number;
    attribute: Attributes;
    attributes: Attributes[];
    created_at: string;
    updated_at: string;
}
export interface Extras {
    id: number;
    name: string;
    slug: string;
    image_id: number;
    created_at: string;
    updated_at: string;
}

export interface Images {
    id: number;
    url: string;
    position?: number;
    products?:Product
    pivot: Pivot;
    created_at?: string;
    updated_at?: string;
}

export interface Pivot {
    product_id: number;
    image_id: number;
}