import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlinePhone, HiOutlineInformationCircle } from "react-icons/hi";
import Layout from "../components/Layout";
import PaymentModal from "../components/PaymentModal";
import { useCart } from "../context/CartContext";
import { formatNaira } from "../mock/mockData";
import orderApi from "../api/orderApi";
import customerApi from "../api/customerApi";
import { generateId } from "../utils/id";
import { getStoredCustomerId, setStoredCustomer, getStoredCustomerProfile } from "../session";

export default function Checkout() {
  const { items, restaurantName, restaurantId, subtotal, clearCart } = useCart();
  const storedProfile = getStoredCustomerProfile();

  const [firstName, setFirstName] = useState(storedProfile?.firstName || "");
  const [lastName, setLastName] = useState(storedProfile?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(storedProfile?.phoneNumber || "");
  const [showPayment, setShowPayment] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState(null);
  const navigate = useNavigate();

  const total = subtotal;
  const hasProfile = Boolean(getStoredCustomerId());

  // There is no login endpoint on the backend - the first checkout creates a
  // real Customer record via POST /api/customers (customerId is client-
  // generated, per CustomerRequest) and remembers it in localStorage.
  async function ensureCustomerId() {
    const existing = getStoredCustomerId();
    if (existing) return existing;

    const customerId = generateId("CUST");
    await customerApi.create({ customerId, firstName, lastName, phoneNumber });
    setStoredCustomer(customerId, { firstName, lastName, phoneNumber });
    return customerId;
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setPlaceError(null);
    try {
      const customerId = await ensureCustomerId();

      // Matches CreateOrderRequest exactly: customerId, restaurantId, items[]
      const payload = {
        customerId,
        restaurantId,
        items: items.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
      };

      const res = await orderApi.placeOrder(payload);
      const newOrderId = res?.data?.id ?? res?.data?.orderId;
      setPlacedOrderId(newOrderId);
      setShowPayment(true);
    } catch (err) {
      setPlaceError(
        err?.response?.data?.message ||
          "Couldn't reach the order service. Check that your backend is running and CORS is enabled for this origin."
      );
    } finally {
      setPlacing(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate(placedOrderId ? `/orders/${placedOrderId}` : "/orders");
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="card mx-auto max-w-lg py-16 text-center">
          <p className="font-semibold text-ink-800">Nothing to checkout yet</p>
          <p className="mt-1 text-sm text-ink-400">Add items to your cart first.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <h1 className="text-2xl font-extrabold text-ink-900">Checkout</h1>

          {!hasProfile && (
            <div className="card p-5">
              <h2 className="mb-3 flex items-center gap-2 font-bold text-ink-900">
                <HiOutlineUser className="h-5 w-5 text-brand-500" />
                Your Details
              </h2>
              <p className="mb-3 text-xs text-ink-400">
                We don't have you saved yet — this creates your customer profile on your
                first order.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="input !rounded-2xl"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="input !rounded-2xl"
                />
              </div>
            </div>
          )}

          <div className="card p-5">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-ink-900">
              <HiOutlinePhone className="h-5 w-5 text-brand-500" />
              Contact Number
            </h2>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 080X XXX XXXX"
              className="input !rounded-2xl"
            />
          </div>

          <div className="flex items-start gap-2 rounded-2xl bg-ink-100 px-4 py-3 text-xs text-ink-500">
            <HiOutlineInformationCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Your current backend schema doesn't store a delivery address or order note yet
              — an order is just a customer, a restaurant, and a list of items. Add those
              fields to <code>CreateOrderRequest</code> if you want them tracked.
            </p>
          </div>
        </div>

        <div>
          <div className="card sticky top-24 p-5">
            <h2 className="mb-3 font-bold text-ink-900">Order Summary</h2>
            <p className="mb-3 text-xs text-ink-400">From {restaurantName}</p>
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-ink-600">
                  <span>
                    {i.quantity} × {i.name}
                  </span>
                  <span className="font-medium text-ink-900">
                    {formatNaira(i.price * i.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-ink-100 pt-3 text-base font-extrabold text-ink-900">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>

            {placeError && (
              <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
                {placeError}
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={!phoneNumber || (!hasProfile && (!firstName || !lastName)) || placing}
              className="btn-primary mt-4 w-full !py-3"
            >
              {placing ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        amount={total}
        orderId={placedOrderId}
        onSuccess={handlePaymentSuccess}
      />
    </Layout>
  );
}
