import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    days: Number,
    totalAmount: Number,

    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Booking", bookingSchema);
