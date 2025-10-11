import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./fetcher";

export const useCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};