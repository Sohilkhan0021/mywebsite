import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId; 
  quantity: number;
  amount: number; 
}

export interface IOrder extends Document {
  userId: Types.ObjectId; 
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    // amount: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    // orderId: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
