import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { uploadToCloudinary, CloudinaryUploadResult } from "@/lib/cloudinary";

interface ProductImage {
  publicId: string;
  url: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      shortDescription,
      detailedDescription,
      price,
      originalPrice,
      discount,
      tax,
      quality,
      category,
      subcategory,
      size,
      colors,
      inStock,
      images,
    }: {
      name: string;
      shortDescription: string;
      detailedDescription: string;
      price: number;
      originalPrice: number;
      discount: number;
      tax: number;
      quality: string;
      category: string;
      subcategory: string;
      size: string;
      colors: string;
      inStock: boolean;
      images: string[];
    } = body;

    // Validate required fields
    if (
      !name ||
      !shortDescription ||
      !detailedDescription ||
      !price ||
      !originalPrice ||
      !quality ||
      !category ||
      !subcategory ||
      !size ||
      !colors
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const uploadedImages: ProductImage[] = [];
    if (images && images.length > 0) {
      for (const imageData of images) {
        try {
          const uploadResult: CloudinaryUploadResult = await uploadToCloudinary(imageData);
          uploadedImages.push({
            publicId: uploadResult.public_id,
            url: uploadResult.secure_url,
          });
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return NextResponse.json(
            { 
              success: false, 
              message: `Failed to upload image: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}` 
            },
            { status: 500 }
          );
        }
      }
    }

    // Create product with Cloudinary image data
    const product = await Product.create({
      name,
      shortDescription,
      detailedDescription,
      price,
      originalPrice,
      discount,
      tax,
      quality,
      category,
      subcategory,
      size,
      colors,
      inStock,
      images: uploadedImages,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Product created successfully", 
        product 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "Server error" 
      },
      { status: 500 }
    );
  }
}