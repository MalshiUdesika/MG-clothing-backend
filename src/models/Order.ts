import mongoose, { Schema, Document, Types } from "mongoose";

export type PaymentMethod = "cash" | "card" | "mobile";
export type OrderStatus = "paid" | "refunded" | "cancelled";

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IOrder extends Document {
  invoiceNumber: string;
  customer?: Types.ObjectId;
  customerName: string;
  cashier: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    barcode: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    subtotal: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer"
    },
    customerName: {
      type: String,
      default: "Walk-in"
    },
    cashier: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: {
      type: [orderItemSchema],
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "mobile"],
      required: true
    },
    status: {
      type: String,
      enum: ["paid", "refunded", "cancelled"],
      default: "paid"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
