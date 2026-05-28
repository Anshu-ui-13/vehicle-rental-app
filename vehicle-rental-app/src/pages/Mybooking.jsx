import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
  if (!window.confirm("Cancel this booking?")) return;

  try {
    const token = localStorage.getItem("token");
    await api.delete(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookings(bookings.filter((b) => b._id !== id));
  } catch (err) {
    alert("Failed to cancel booking");
  }
};
 
const navigate = useNavigate();


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading your bookings…</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-10"
      >
        My Bookings 
      </motion.h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no bookings yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map((b, i) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex"
            >
              {/* Image */}
              <img
                src={b.vehicle?.imageUrl}
                alt={b.vehicle?.name}
                className="w-40 object-cover"
              />

              {/* Details */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-bold">
                  {b.vehicle?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {b.vehicle?.type} • {b.vehicle?.location}
                </p>

                <p className="mt-2">
                  Days: <strong>{b.days}</strong>
                </p>
                <p>
                  Amount: <strong>₹{b.totalAmount}</strong>
                </p>

                <button
        onClick={() => deleteBooking(b._id)}
        className="text-red-600 font-semibold hover:underline mt-2"
      >
        Cancel Booking
      </button>

                <span
  className={`px-3 py-1 rounded-full text-sm font-semibold ${
    b.status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {b.status}
</span>
                

                <button
  onClick={() => navigate(`/receipt/${b._id}`)}
  className="mt-2 text-purple-600 font-semibold hover:underline"
>
  View Receipt
</button>

              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
