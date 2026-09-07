import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import TrackOrder from "./pages/TrackOrder";
import Payment from "./pages/Payment";
import Complaint from "./pages/Complaint";
import Rating from "./pages/Rating";
import AdminDashboard from "./pages/AdminDashboard";
import WaiterDashboard from "./pages/WaiterDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurants/:id" element={<RestaurantMenu />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/track" element={<TrackOrder />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/complaint" element={<Complaint />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/waiter" element={<WaiterDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
