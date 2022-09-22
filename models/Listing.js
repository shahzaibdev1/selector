import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListingSchema = Schema(
  // {
  //   marketplace: { type: String, required: true },
  //   url: String,
  //   listing: [
  //     {
  //       country: String,
  //       listing: [
  //         {
  //           pageType: String,
  //           url: String,
  //           listing: [{ type: Schema.Types.ObjectId, ref: "Selector" }],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    marketplace: {
      type: Schema.Types.ObjectId,
      ref: "Marketplace",
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    pageType: { type: Schema.Types.ObjectId, ref: "PageType", required: true },
    listing: [{ type: Schema.Types.ObjectId, ref: "Selector" }],
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("Listing", ListingSchema);
