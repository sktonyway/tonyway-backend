import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sessionSchema = new mongoose.Schema({
  ip: String,
  logged_at: {
    type: Date,
    default: Date.now,
  },
  device_name: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // It will required to be true
    },
    userName: {
      type: String,
      trim: true,
      unique: true, // required true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
      default: " ", // An array of profile pics to choose from and will randomly chose
    },
    dob: {
      type: Date,
    },
    sessions: {
      type: [sessionSchema],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (givenPass) {
  return await bcrypt.compare(givenPass, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.jwt_secret, {
    expiresIn: "7d",
  });
};

export default mongoose.model("User", UserSchema);
