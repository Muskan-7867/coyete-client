
"use server"
import Product from "@/models/Product";
import connectDB from "../db";



export async function getProductsByCategory(categoryId: string) {
  try {
    await connectDB();

    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    const products = await Product.find({ category: categoryId })
      .sort({ createdAt: -1 })
      .lean();

    // ✅ Convert to plain serializable objects
    const plainProducts = JSON.parse(JSON.stringify(products));

    return { success: true, products: plainProducts };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Server error",
      products: []
    };
  }
}


export async function getSingleProduct(id: string) {
  await connectDB();
  try {
    const product = await Product.findById(id).lean();
    if (!product) return { success: false, message: "Product not found" };
    const plainProduct = JSON.parse(JSON.stringify(product));
    return { success: true, product: plainProduct }; // Fixed: changed plainProduct to product
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, message: "Server error" };
  }
}


export async function getProductBySlug(slug: string) {
  try {
    await connectDB();

    if (!slug) {
      return { success: false, message: "Slug is required" };
    }

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    const plainProduct = JSON.parse(JSON.stringify(product));
    return { success: true, product: plainProduct };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Server error"
    };
  }
}