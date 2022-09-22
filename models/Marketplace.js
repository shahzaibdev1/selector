import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MarketplaceSchema = Schema(
  {
    marketplace: { type: String, required: true },
    marketplaceUrl: { type: String },
    countryList: [{ type: Schema.Types.ObjectId, ref: "Country" }],
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("Marketplace", MarketplaceSchema);
