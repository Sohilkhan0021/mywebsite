import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  subtitle: string;
  price: number;
  img: string;
  category: string;
  details: string;
  stock: number;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    price: { type: Number, required: true },
    img: { type: String, required: true },
    category: String,
    details: String,
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);