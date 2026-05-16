import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  totalSpent: number;
  totalOrders: number;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    totalOrders: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
