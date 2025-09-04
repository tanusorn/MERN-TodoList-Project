import mongoose from "mongoose";

//export DB
export async function connectDB(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected success");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
