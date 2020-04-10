export interface User {
    id: number;
    name?: string;
    email: string;
    password: string;
    email_verified_at?: any;
    city_id:number;
    neighborhood_id:number;
    created_at: string;
    updated_at: string;
}
export interface CurrentUser {
    token: string;
    token_type: string;
    user: User
}
