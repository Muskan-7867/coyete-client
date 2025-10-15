
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
      .sort({ createdAt: -1 }) // optional: newest first
      .lean(); // convert to plain JS objects, safe for passing to client components

    return { success: true, products };
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