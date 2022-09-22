import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SelectorSchema = Schema(
  {
    selectorName: String,
    selectorText: [{ type: String }],
    tagName: String,
    valueAccessProperty: String,
    hint: String,
    attribute: String,
    valueToMatch: String,
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },

  { strict: false }
);

export default mongoose.model("Selector", SelectorSchema);
