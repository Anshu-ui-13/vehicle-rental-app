import express from "express";
import Booking from "../models/Booking.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   CREATE BOOKING (DATE CHECK)
   ========================= */
router.post("/", protect, async (req, res) => {
  try {
    const { vehicle, startDate, endDate, days, totalAmount } = req.body;

    // ❌ Check if vehicle already booked in this date range
    const conflict = await Booking.findOne({
      vehicle,
      status: "Confirmed",
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
    });

    if (conflict) {
      return res.status(400).json({
        message: "Vehicle not available for selected dates",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      vehicle,
      startDate,
      endDate,
      days,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});

/* =========================
   MY BOOKINGS
   ========================= */
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("vehicle")
    .sort({ createdAt: -1 });

  res.json(bookings);
});

/* =========================
   SINGLE BOOKING (RECEIPT)
   ========================= */
router.get("/:id", protect, async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("vehicle")
    .populate("user", "name email");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user._id.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  res.json(booking);
});

/* =========================
   CONFIRM BOOKING (PAYMENT)
   ========================= */
router.put("/:id/confirm", protect, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  booking.status = "Confirmed";
  await booking.save();

  res.json({ message: "Booking confirmed" });
});

/* =========================
   DELETE BOOKING
   ========================= */
router.delete("/:id", protect, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await booking.deleteOne();
  res.json({ message: "Booking cancelled" });
});

export default router;
