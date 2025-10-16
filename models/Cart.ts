import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    
  },
  { timestamps: true }
);

const Cart =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
