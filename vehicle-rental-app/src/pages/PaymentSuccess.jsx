import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-6xl mb-4"
        >
          ✅
        </motion.div>

        <h1 className="text-3xl font-extrabold mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed successfully.
        </p>

        <button
          onClick={() => navigate("/my-bookings")}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:opacity-95 transition"
        >
          Go to My Bookings
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
