import mongoose, { Schema, model, models } from "mongoose";

const MetalSliderSchema = new Schema(
  {
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const MetalSlider = models.MetalSlider || model("MetalSlider", MetalSliderSchema);
export default MetalSlider;
