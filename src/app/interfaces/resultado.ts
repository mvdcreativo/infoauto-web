import { Product } from './product';

    export interface Brand {
        id: number;
        name: string;
        slug: string;
        image_id: number;
        created_at: string;
        updated_at: string;
    }

    export interface VehicleCategory {
        id: number;
        name: string;
        slug: string;
        image_id: number;
        created_at: string;
        updated_at: string;
    }

    export interface VehicleModel {
        id: number;
        name: string;
        slug: string;
        brand_id: number;
        image_id: number;
        created_at: string;
        updated_at: string;
    }

    export interface VehicleSubModel {
        id: number;
        name: string;
        slug: string;
        created_at: string;
        updated_at: string;
    }

    export interface Pivot {
        product_id: number;
        image_id: number;
    }

    export interface Image {
        id: number;
        url: string;

        pivot: Pivot;
        products?:Product
    }

    export interface City {
        id: number;
        name: string;
        code: string;
        state_id: number;
        created_at: string;
        updated_at: string;
    }

    export interface Currency {
        id: number;
        name: string;
        symbol: string;
        abbreviation: string;
        value: string;
        primary: number;
        created_at?: any;
        updated_at?: any;
    }

    export interface DataResult {
        id: number;
        name_concat: string;
        description: string;
        price: number;
        state: string;
        km: number;
        year: number;
        visit: number;
        condition_id: number;
        brand_id: number;
        vehicle_category_id: number;
        vehicle_model_id: number;
        vehicle_sub_model_id: number;
        city_id: number;
        user_id: number;
        price_condition_id: number;
        tariff_id: number;
        currency_id: number;
        created_at: string;
        updated_at: string;
        brand: Brand;
        vehicle_category: VehicleCategory;
        vehicle_model: VehicleModel;
        vehicle_sub_model: VehicleSubModel;
        images: Image[];
        city: City;
        currency: Currency;
    }

    export interface Result {
        current_page: number; 
        data: DataResult[];
        next_page_url: string;
        path: string;
        per_page: number;
        total: number;
        

    }

export interface NameConcat{
    //ID a name slug
    brand_id: string;
    vehicle_model_id: string; 
    vehicle_sub_model_id: string;
}
