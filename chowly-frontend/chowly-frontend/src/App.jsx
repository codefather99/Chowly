import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ComplaintPage from "./pages/ComplaintPage";
import RatingPage from "./pages/RatingPage";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/restaurants/:restaurantId"
                element={<RestaurantPage />}
            />

            <Route
                path="/cart"
                element={<CartPage />}
            />

            <Route
                path="/checkout"
                element={<CheckoutPage />}
            />

            <Route
                path="/orders/:orderId"
                element={<OrderTrackingPage />}
            />

            <Route
                path="/orders/:orderId/complaint"
                element={<ComplaintPage />}
            />

            <Route
                path="/orders/:orderId/rating"
                element={<RatingPage />}
            />

            <Route
                path="/staff"
                element={<StaffDashboard />}
            />

            <Route
                path="/admin"
                element={<AdminDashboard />}
            />

        </Routes>
    );
}

export default App;