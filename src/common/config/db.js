import mongoose from "mongoose";

async function connectDB(uri) {
  if (!uri) {
    throw new Error("Connection String Required ");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(process.env.mongodb_uri);
    console.log("MongoDB connected successfully at: ", conn.connection.host);
  } catch (error) {
    console.log("MonggoDB connection Error", error);
    process.exit(1);
  }
}

export default connectDB;
