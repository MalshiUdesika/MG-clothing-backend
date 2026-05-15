import mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : { type: String, required: true },
    barcode : { type: String, required: true, unique: true, index: true},
    category: String,
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    image: String,
    createdAt: { type: Date, default: Date.now },
});

export const Product = model("Product", productSchema);