import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CountrySchema = Schema({
        country: { type: String, required: true },
        countryCode: { type: String, required: true },
        marketplace: {
            type: Schema.Types.ObjectId,
            ref: "Marketplace",
            required: true,
        },
        pageTypes: [{ type: Schema.Types.ObjectId, ref: "PageType" }],
    },

    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

export default mongoose.model("Country", CountrySchema);