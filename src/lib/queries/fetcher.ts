
import { CategoryT } from "@/types";
import axios from "axios";

export const fetchCategories = async (): Promise<CategoryT[]> => {
    try {
      const res = await axios.get(`/api/categories`);
      console.log("from fetcher", res.data.categories);
      return res.data.categories;
      
    } catch (error) {
      console.log(error);
      return [];
    }
  };