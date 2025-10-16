import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  createdAt: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    userId: { type: String, required: true },
    name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { timestamps: true }
);

export default mongoose.models.Address ||
  mongoose.model<IAddress>("Address", AddressSchema);
