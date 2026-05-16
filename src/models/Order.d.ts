import { Schema } from "mongoose";
export declare const Order: import("mongoose").Model<{
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
}, import("mongoose").Document<unknown, {}, {
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    cashier: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    invoiceNo: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }, {}, {}> & {
        name?: string | null;
        price?: number | null;
        qty?: number | null;
        product?: import("mongoose").Types.ObjectId | null;
    }>;
    discount: number;
    status: "paid" | "refunded";
    subtotal?: number | null;
    tax?: number | null;
    total?: number | null;
    customer?: import("mongoose").Types.ObjectId | null;
    payment?: "cash" | "card" | "mobile" | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Order.d.ts.map