import { Schema } from "mongoose";
export declare const User: import("mongoose").Model<{
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "manager" | "cashier";
    createdAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map