import React, { useState } from "react";
import { HiOutlineCreditCard, HiOutlineDeviceMobile, HiOutlineOfficeBuilding, HiOutlineCash } from "react-icons/hi";
import Modal from "./Modal";
import { formatNaira } from "../mock/mockData";
import paymentApi from "../api/paymentApi";

// Matches the PaymentMethod enum exactly
const methods = [
  { id: "CARD", label: "Debit / Credit Card", icon: HiOutlineCreditCard },
  { id: "BANK_TRANSFER", label: "Bank Transfer", icon: HiOutlineOfficeBuilding },
  { id: "MOBILE_MONEY", label: "Mobile Money", icon: HiOutlineDeviceMobile },
  { id: "CASH", label: "Cash on Delivery", icon: HiOutlineCash },
];

export default function PaymentModal({ open, onClose, amount, orderId, onSuccess }) {
  const [selected, setSelected] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      // Matches CreatePaymentRequest exactly: { orderId, paymentMethod }
      await paymentApi.create({ orderId, paymentMethod: selected });
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Payment couldn't reach the backend. Confirm /api/payments is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Complete Payment">
      <p className="mb-4 text-sm text-ink-500">
        Amount due:{" "}
        <span className="font-bold text-ink-900">{formatNaira(amount)}</span>{" "}
        <span className="text-xs text-ink-400">(tracked from your order, not sent here)</span>
      </p>

      <div className="flex flex-col gap-2">
        {methods.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
              selected === id
                ? "border-brand-400 bg-brand-50 text-brand-700"
                : "border-ink-200 text-ink-600 hover:bg-ink-50"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

      <button onClick={handlePay} disabled={loading} className="btn-primary mt-5 w-full !py-3">
        {loading ? "Processing..." : `Pay ${formatNaira(amount)}`}
      </button>
    </Modal>
  );
}
