import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "sub-admin"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
      select: false,
      min: 8,
    },

    otp: {
      type: Number,
      select: false,
    },

    stripe: {
      sessionId: { type: String },
      customerId: { type: String },
      subscriptionId: { type: String },
      required: false,

      select: false,
    },
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("User", UserSchema);
