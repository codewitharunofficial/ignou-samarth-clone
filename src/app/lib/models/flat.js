
import mongoose from "mongoose";

const flatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    odlId: {
      type: String,
      default: "",
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    division: {
      type: String,
      default: "",
      trim: true,
    },
    flatNo: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    change: {
      type: String,
      default: "",
    },
    remarks: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true, // e.g., Type-I, Type-II
    },
    block: {
      type: String,
      default: "", // optional, can be added while parsing A1 → A
    },
    campus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Flat || mongoose.model("Flat", flatSchema);
