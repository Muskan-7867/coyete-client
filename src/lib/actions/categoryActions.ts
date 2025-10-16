"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import { SubCategoryT } from "@/types";


export async function populateSubcategories(
  subcategories: SubCategoryT[],
  depth = 5
) {
  if (depth <= 0) return subcategories;

  const populated = await SubCategory.populate(subcategories, {
    path: "subcategories"
  });

  populated.sort((a, b) => (a.rank || 0) - (b.rank || 0));

  for (const subcat of populated) {
    if (subcat.subcategories && subcat.subcategories.length > 0) {
      await populateSubcategories(subcat.subcategories, depth - 1);
    }
  }

  return populated;
}

// ---------------------------------------------------------
// ✅ GET: Fetch all categories
// ---------------------------------------------------------
export async function getAllCategories() {
  try {
    await connectDB();

    const categories = await Category.find()
      .populate("subcategories")
      .sort({ rank: 1, createdAt: -1 });

    for (const category of categories) {
      if (category.subcategories?.length > 0) {
        await populateSubcategories(category.subcategories);
      }
    }

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
// ---------------------------------------------------------
// ✅ POST: Create a new category
// ---------------------------------------------------------
export async function createCategory(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || "";
    const rank = Number(formData.get("rank")) || 0;

    if (!name || name.trim() === "") {
      return { success: false, error: "Category name is required" };
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return {
        success: false,
        error: "Category with this name already exists"
      };
    }

    const category = new Category({
      name: name.trim(),
      description: description.trim(),
      rank,
      subcategories: []
    });

    await category.save();
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category created successfully",
      category: JSON.parse(JSON.stringify(category))
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

// ---------------------------------------------------------
// ✅ PUT: Update an existing category
// ---------------------------------------------------------
export async function updateCategory(formData: FormData) {
  try {
    await connectDB();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || "";
    const rank = Number(formData.get("rank")) || 0;

    if (!id) return { success: false, error: "Category ID is required" };
    if (!name || name.trim() === "")
      return { success: false, error: "Category name is required" };

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        rank
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category updated successfully",
      category: JSON.parse(JSON.stringify(category))
    };
  } catch (error) {
    console.error("Error updating category:", error);
   
    return { success: false, error: "Failed to update category" };
  }
}

// ---------------------------------------------------------
// ✅ DELETE: Delete category by ID
// ---------------------------------------------------------
export async function deleteCategory(id: string) {
  try {
    await connectDB();

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    revalidatePath("/admin/categories");

    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}


export async function getCategoryById(id: string) {
  try {
    await connectDB();

    const category = await Category.findById(id).lean(); // ✅ use lean()

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    // ✅ ensure safe serialization
    const plainCategory = JSON.parse(JSON.stringify(category));

    return { success: true, category: plainCategory };
  } catch (error) {
    console.error("Error fetching category:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Server error"
    };
  }
}
