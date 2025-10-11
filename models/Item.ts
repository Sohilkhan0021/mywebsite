import { Schema, model, models } from "mongoose";

export interface IItem {
  name: string;
  description?: string;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String },
});

const Item = models.Item || model<IItem>("Item", ItemSchema);
export default Item;
