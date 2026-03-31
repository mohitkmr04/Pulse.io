import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);

    // Optional: log full error for debugging
    console.error(error);

    // Exit process (recommended for backend apps)
    process.exit(1);
  }
};