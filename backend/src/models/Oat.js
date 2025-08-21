import mongoose from "mongoose";

const oatSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Oat = mongoose.model("Oat", oatSchema);

export default Oat;
