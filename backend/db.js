import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongodb is connected");
  } catch (error) {
    console.error("Error in connection ",error)
    
  }
};
