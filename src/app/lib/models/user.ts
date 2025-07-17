import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  password: string;
  role: "admin" | "student" | "evaluator"; // You can expand roles here
}

const UserSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "evaluator"],
      default: "student",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
