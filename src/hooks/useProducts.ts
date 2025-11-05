import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById, fetchProductsByCategory } from "../context/api";
import type { Product } from "../types/Product";


export const useProducts = (selectedCategory?: string) => {
    return useQuery<Product[]>({
        queryKey: ["products", selectedCategory],
        queryFn: () => 
            selectedCategory ? fetchProductsByCategory(selectedCategory) : fetchProducts(),
    });
};


export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category, 
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};