import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          VehicleRent
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {token ? (
            <>
              <Link to="/" className="text-white font-medium">
                Vehicles
              </Link>
              <Link to="/add-vehicle" className="text-white font-medium">
                Add Vehicle
              </Link>
              <Link to="/my-bookings" className="text-white font-medium">
                My Bookings
              </Link>

              {/* 👤 Profile Menu */}
              <ProfileMenu />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-black/80 text-white">
          {token ? (
            <>
              <Link to="/" onClick={() => setOpen(false)}>
                Vehicles
              </Link>
              <Link to="/add-vehicle" onClick={() => setOpen(false)}>
                Add Vehicle
              </Link>
              <Link to="/my-bookings" onClick={() => setOpen(false)}>
                My Bookings
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
