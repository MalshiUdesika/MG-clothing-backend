import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  barcode: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    barcode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    image: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
