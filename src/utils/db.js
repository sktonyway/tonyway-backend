import mongoose from "mongoose";

async function connectDB(uri) {
  if (!uri) {
    throw new Error("Connection String Required ");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
  } catch (error) {
    console.log("MonggoDB connection Error", error);
    process.exit(1);
  }
}

export { connectDB };
