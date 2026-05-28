import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import BookVehicle from "./pages/BookVehicle";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Mybooking from "./pages/Mybooking";
import Receipt from "./pages/Receipt";
import PaymentSuccess from "./pages/PaymentSuccess";
import VehicleDetails from "./pages/VehicleDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-vehicle"
          element={
            <ProtectedRoute>
              <AddVehicle />
            </ProtectedRoute>
          }
        />

        <Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <Mybooking />
    </ProtectedRoute>
  }
/>

<Route
  path="/receipt/:id"
  element={
    <ProtectedRoute>
      <Receipt />
    </ProtectedRoute>
  }
/>   

<Route path="/profile" element={<Profile />} />

               
     <Route
  path="/payment-success"
  element={
    <ProtectedRoute>
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>
       <Route path="/vehicle/:id" element={<VehicleDetails />} />

        {/* BOOK ROUTE */}
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookVehicle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
