import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const VehicleDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await api.get(`/vehicles/${id}/details`);
      setData(res.data);
    };
    fetchDetails();
  }, [id]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={data.vehicle.imageUrl}
        alt={data.vehicle.name}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">
        {data.vehicle.name}
      </h1>

      <p><b>Type:</b> {data.vehicle.type}</p>
      <p><b>Location:</b> {data.vehicle.location}</p>
      <p><b>Price:</b> ₹{data.vehicle.pricePerDay}/day</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Already Booked Dates
      </h2>

      {data.bookedDates.length === 0 ? (
        <p className="text-green-600">
          No bookings yet – Available 
        </p>
      ) : (
        <ul className="list-disc ml-6">
          {data.bookedDates.map((b, i) => (
            <li key={i}>
              {new Date(b.startDate).toDateString()} →{" "}
              {new Date(b.endDate).toDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VehicleDetails;
