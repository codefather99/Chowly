import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiOutlineCreditCard, HiOutlineDeviceMobile, HiOutlineOfficeBuilding, HiOutlineCash, HiOutlineShieldCheck } from "react-icons/hi";
import Layout from "../components/Layout";
import { formatNaira } from "../mock/mockData";
import paymentApi from "../api/paymentApi";

// Matches the PaymentMethod enum exactly
const methods = [
  { id: "CARD", label: "Debit / Credit Card", icon: HiOutlineCreditCard },
  { id: "BANK_TRANSFER", label: "Bank Transfer", icon: HiOutlineOfficeBuilding },
  { id: "MOBILE_MONEY", label: "Mobile Money", icon: HiOutlineDeviceMobile },
  { id: "CASH", label: "Cash on Delivery", icon: HiOutlineCash },
];

export default function Payment() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const amount = Number(searchParams.get("amount") || 0);
  const [selected, setSelected] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      // Matches CreatePaymentRequest exactly: { orderId, paymentMethod }
      await paymentApi.create({ orderId, paymentMethod: selected });
      navigate(`/orders/${orderId}`);
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
    <Layout>
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-2xl font-extrabold text-ink-900">Payment</h1>

        <div className="card p-6">
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-yellow-50 px-3 py-2 text-xs font-semibold text-yellow-700">
            ⚠️ Demo payment — no money moves. This just records a pretend payment against your order.
          </div>
          <p className="text-sm text-ink-500">
            Order <span className="font-semibold text-ink-800">{orderId}</span>
          </p>
          <p className="mt-1 text-3xl font-extrabold text-ink-900">{formatNaira(amount)}</p>

          <div className="mt-6 flex flex-col gap-2">
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

          <button onClick={handlePay} disabled={loading} className="btn-primary mt-6 w-full !py-3">
            {loading ? "Recording pretend payment..." : `Simulate Payment of ${formatNaira(amount)}`}
          </button>

          {error && (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-yellow-50 px-3 py-2.5 text-yellow-700">
            <HiOutlineShieldCheck className="h-5 w-5 shrink-0" />
            <p className="text-xs font-semibold">Pretend payment only — no money is ever moved</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
