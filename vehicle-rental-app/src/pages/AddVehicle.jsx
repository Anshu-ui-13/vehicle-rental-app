import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";

const AddVehicle = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    location: "",
    pricePerDay: "",
    imageUrl: "",
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // Cloudinary image upload
  const uploadImage = async (file) => {
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vehicle_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const img = await res.json();

      setForm((prev) => ({ ...prev, imageUrl: img.secure_url }));
      setPreview(img.secure_url);
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Submit vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.type ||
      !form.location ||
      !form.pricePerDay ||
      !form.imageUrl
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/vehicles",
        {
          ...form,
          pricePerDay: Number(form.pricePerDay),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Vehicle added successfully ");

      setForm({
        name: "",
        type: "",
        location: "",
        pricePerDay: "",
        imageUrl: "",
      });
      setPreview("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add vehicle");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl w-full max-w-xl shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Add Your Vehicle
        </h2>

        <input
          type="text"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/80"
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/80"
        >
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="scooty">Scooty</option>
          <option value="auto">Auto</option>
        </select>

        <input
          type="text"
          placeholder="Area / Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/80"
        />

        <input
          type="number"
          placeholder="Price per day (₹)"
          value={form.pricePerDay}
          onChange={(e) =>
            setForm({ ...form, pricePerDay: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/80"
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            uploadImage(e.target.files[0])
          }
          className="w-full mb-4 text-white"
        />

        <input
          type="text"
          placeholder="Or paste image URL"
          value={form.imageUrl}
          onChange={(e) => {
            setForm({ ...form, imageUrl: e.target.value });
            setPreview(e.target.value);
          }}
          className="w-full mb-4 p-3 rounded-lg bg-white/80"
        />

        {preview && (
          <motion.img
            src={preview}
            alt="Preview"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-40 w-full object-cover rounded-lg mb-4"
          />
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold"
        >
          {uploading ? "Uploading..." : "Add Vehicle"}
        </button>
      </motion.form>
    </div>
  );
};

export default AddVehicle;
