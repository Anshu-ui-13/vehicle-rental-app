import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes.js";
import vehicleRoutes from "./routes/VehicleRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE (VERY IMPORTANT)
   ========================= */
app.use(cors());
app.use(express.json()); // ❗ THIS WAS MISSING MOST LIKELY

/* =========================
   ROUTES
   ========================= */
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoute);

/* =========================
   TEST ROUTE
   ========================= */
app.get("/api/test", (req, res) => {
  res.json({ message: "API working 🚀" });
});

/* =========================
   DB CONNECT
   ========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* =========================
   SERVER START
   ========================= */
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
