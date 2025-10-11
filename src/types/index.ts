export type SubCategoryT = {
  _id: string;
  name: string;
  parentCategory: string;
  parentSubCategory?: string | null;
  subcategories?: SubCategoryT[];
};

export type CategoryT = {
  _id: string;
  name: string;
  description?: string | null;
  subcategories: SubCategoryT[];
};
