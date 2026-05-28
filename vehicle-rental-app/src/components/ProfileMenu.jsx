import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

// 🔐 Token se user id nikalna
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).id;
  } catch {
    return null;
  }
};

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 👤 User details fetch
  useEffect(() => {
    const fetchUser = async () => {
      const id = getUserIdFromToken();
      if (!id) return;

      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.log("Profile load failed");
      }
    };
    fetchUser();
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-semibold text-white"
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block">{user.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            View Profile
          </button>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
