import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  products: {
    productId: string;
    title: string;
    subtitle?: string;
    img: string;
    price: number;
    quantity: number;
    stock: number;
  }[];
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        stock: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
