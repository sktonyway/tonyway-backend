import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();    
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_uri || 'mongodb://localhost:27017/todo-db');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;