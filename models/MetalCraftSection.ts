import mongoose from "mongoose";

const MetalCraftSectionSchema = new mongoose.Schema({
  images: {
    type: [String], // two images
    required: true,
  },
});

export default mongoose.models.MetalCraftSection ||
  mongoose.model("MetalCraftSection", MetalCraftSectionSchema);
