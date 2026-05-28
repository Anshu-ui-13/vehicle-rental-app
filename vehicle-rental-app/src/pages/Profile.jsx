import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

// 🔐 get user id from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).id;
  } catch {
    return null;
  }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const id = getUserIdFromToken();
      if (!id) return;

      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch {
        alert("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold mt-4">
          {user.name}
        </h2>

        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-4">
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
