import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  console.log("🔍 Attempting MongoDB connection...");
  console.log("MONGO_URI defined:", !!mongoUri);
  
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not set");
  }
  
  try {
    await mongoose.connect(mongoUri);
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error instanceof Error ? error.message : error);
    throw error;
  }
}