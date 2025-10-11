import mongoose, { Schema, Document } from "mongoose";

export interface ISubCategory extends Document {
  name: string;
  parentCategory: mongoose.Types.ObjectId;
  parentSubCategory?: mongoose.Types.ObjectId | null;
  subcategories?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    parentSubCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);

// Optional: unique name per parent context
SubCategorySchema.index(
  { name: 1, parentCategory: 1, parentSubCategory: 1 },
  { unique: true }
);

export default mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);
