import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone?: string;
  country?: string;
  address: {
    apartment?: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
  };
}

const AddressSchema = new Schema(
  {
    country:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    address:{type:String},
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    phone:{type:Number},
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: String,
    country: String,
    address: {type: AddressSchema,},
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
