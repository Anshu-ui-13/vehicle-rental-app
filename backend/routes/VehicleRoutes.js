import express from "express";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   ADD VEHICLE (OWNER)
   ========================= */
router.post("/", protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.create({
      name: req.body.name,
      type: req.body.type,
      pricePerDay: req.body.pricePerDay,
      location: req.body.location,
      imageUrl: req.body.imageUrl,
      owner: req.user.id,
    });

    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   ALL VEHICLES
   ========================= */
router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

/* =========================
   VEHICLE + BOOKED DATES
   ========================= */
router.get("/:id/details", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  const bookings = await Booking.find({
    vehicle: req.params.id,
    status: "Confirmed",
  }).select("startDate endDate");

  res.json({
    vehicle,
    bookedDates: bookings,
  });
});

/* =========================
   SINGLE VEHICLE
   ========================= */
router.get("/:id", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.json(vehicle);
});

export default router;
