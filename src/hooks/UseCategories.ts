import { useQuery } from "@tanstack/react-query";
import{ fetchCategories } from "../context/api";

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
