import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:String,
    password:String
})
UserSchema.index({username:"Text"})
export default mongoose.model('User', UserSchema, 'users')