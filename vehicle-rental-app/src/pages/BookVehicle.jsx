import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const BookVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await api.get(`/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        alert("Failed to load vehicle");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select dates");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const days =
        (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24) + 1;

      const totalAmount = days * vehicle.pricePerDay;

      const res = await api.post(
        "/bookings",
        {
          vehicle: vehicle._id,
          startDate,
          endDate,
          days,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // payment simulation
      await api.put(
        `/bookings/${res.data._id}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking confirmed 🎉");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    // ✅ NAVBAR GAP + MOBILE PADDING
    <div className="min-h-screen bg-gray-100 px-4 pt-10 pb-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* IMAGE */}
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full p-4 h-52 sm:h-60  rounded-2xl object-cover"
        />

        {/* DETAILS */}
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">{vehicle.name}</h2>

          <p className="text-lg font-semibold">
            Type: <span className="font-normal">{vehicle.type}</span>
          </p>

          <p className="text-lg font-semibold">
            Location:{" "}
            <span className="font-normal">{vehicle.location}</span>
          </p>

          <p className="text-lg font-semibold">
            Price:{" "}
            <span className="font-normal">
              ₹{vehicle.pricePerDay}/day
            </span>
          </p>
        </div>

        {/* DATE INPUTS */}
        <div className="flex flex-col sm:flex-row gap-4 px-5">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleBooking}
          className="m-4 p-4 w-auto  bg-purple-600 text-white  rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default BookVehicle;
