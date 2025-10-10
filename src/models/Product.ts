import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    quality: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    size: { type: String, required: true },
    colors: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    images: [{ type: String }], // store image URLs (Cloudinary or local)
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;
