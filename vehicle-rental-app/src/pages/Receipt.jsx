import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api";

const Receipt = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooking(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading receipt…
      </div>
    );
  }

  if (!booking) {
    return <p className="text-center">Receipt not found</p>;
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Booking Receipt 
        </h1>

        <div className="border-t border-b py-4 mb-6">
          <p><strong>Receipt ID:</strong> {booking._id}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(booking.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <img
            src={booking.vehicle.imageUrl}
            alt={booking.vehicle.name}
            className="w-40 h-28 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-bold">
              {booking.vehicle.name}
            </h2>
            <p>{booking.vehicle.type}</p>
            <p>{booking.vehicle.location}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <p>
            <strong>Days:</strong> {booking.days}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{booking.totalAmount}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {booking.isPaid ? "Paid" : "Pending"}
          </p>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Customer: {booking.user.name}
            </p>
            <p className="text-sm text-gray-600">
              {booking.user.email}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Print / Download
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Receipt;
