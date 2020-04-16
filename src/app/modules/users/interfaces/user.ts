export interface User {
    discount: any;
    company: any;
    rut: any;
    ci: any;
    phone: any;
    address?: any;
    id: number;
    name?: string;
    email: string;
    password: string;
    email_verified_at?: any;
    city_id:number;
    neighborhood_id:number;
    created_at: string;
    updated_at: string;
    role?:string;
}
export interface CurrentUser {
    token: string;
    token_type: string;
    user: User
}
