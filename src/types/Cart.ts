import type { Product } from "./Product";


export interface CartItem extends Product{
    id: number;
    title: string;
    price: number;
    quantity: number;

}

export interface CartState {
    items: CartItem[];

}