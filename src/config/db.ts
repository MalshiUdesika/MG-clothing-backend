import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Please add it to your .env file.");
  }

  const conn = await mongoose.connect(mongoUri);

  console.log(`MongoDB connected: ${conn.connection.host}`);
}
