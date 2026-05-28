import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Car, Bike
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true }, // city / area
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
