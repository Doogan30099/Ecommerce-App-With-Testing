import axios from 'axios';
import type { Product } from "../types/Product"


const Base_URL = 'https://fakestoreapi.com';


export const fetchProducts = async () : Promise<Product[]> => {
    const res = await axios.get(`${Base_URL}/products`);
    return res.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const res = await axios.get(`${Base_URL}/products/${id}`);
    return res.data;
}


export const fetchCategories = async (): Promise<string[]> => {
    const res = await axios.get(`${Base_URL}/products/categories`);
    return res.data;
};


export const fetchProductsByCategory = async (category: string ): Promise<Product[]> => {
    const res = await axios.get(`${Base_URL}/products/category/${category}`);
    return res.data;
};

