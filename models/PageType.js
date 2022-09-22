import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PageTypeSchema = Schema(
  {
    pageType: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("PageType", PageTypeSchema);
