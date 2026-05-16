import { Schema } from "mongoose";
export declare const Product: import("mongoose").Model<{
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    createdAt: NativeDate;
    barcode: string;
    price: number;
    stock: number;
    category?: string | null;
    image?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Product.d.ts.map