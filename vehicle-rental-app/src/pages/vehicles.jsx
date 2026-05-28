import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get("/vehicles");
        setVehicles(res.data || []);
      } catch (err) {
        alert("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  //  filter logic
  const filteredVehicles = vehicles.filter((v) => {
    return (
      (search === "" ||
        v.location.toLowerCase().includes(search.toLowerCase())) &&
      (type === "" || v.type === type)
    );
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-10 pb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Available Vehicles 
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg p-3 w-full sm:w-60 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Types</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="scooty">Scooty</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {/*  VEHICLE CARDS */}
        {filteredVehicles.length === 0 ? (
          <p className="text-center text-gray-500">
            No vehicles found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredVehicles.map((v) => (
              <div
                key={v._id}
                onClick={() => navigate(`/vehicle/${v._id}`)}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                <img
                  src={
                    v.imageUrl?.startsWith("http")
                      ? v.imageUrl
                      : "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={v.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4 space-y-1">
                  <h2 className="font-bold text-lg">{v.name}</h2>
                  <p className="text-sm text-gray-600">
                    {v.type} • {v.location}
                  </p>
                  <p className="font-semibold">
                    ₹{v.pricePerDay}/day
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/book/${v._id}`);
                    }}
                    className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
