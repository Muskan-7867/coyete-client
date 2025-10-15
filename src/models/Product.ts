import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'] 
  },
  shortDescription: { 
    type: String, 
    required: [true, 'Short description is required'] 
  },
  detailedDescription: { 
    type: String, 
    required: [true, 'Detailed description is required'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: { 
    type: Number, 
    required: [true, 'Original price is required'],
    min: [0, 'Original price cannot be negative']
  },
  discount: { 
    type: Number, 
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  tax: { 
    type: Number, 
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  quality: { 
    type: String, 
    required: [true, 'Quality is required'] 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  },
  size: { 
    type: String, 
    required: [true, 'Size is required'] 
  },
  colors: { 
    type: String, 
    required: [true, 'Color is required'] 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  },
  images: [
    {
      publicId: { type: String, required: true },
      url: { type: String, required: true },
      rank: { type: Number, default: 0, min: 0 }
    }
  ]
}, {
  timestamps: true
});

// ✅ Fix for model overwrite in Next.js
const Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema);

export default Product;
