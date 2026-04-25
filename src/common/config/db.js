import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.mongodb_uri);
  console.log("MongoDB connected successfully at: ", conn.connection.host);
};

export default connectDB;
