import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import complaintApi from "../api/complaintApi";
import { getStoredCustomerId } from "../session";

const reasons = [
  "Order arrived late",
  "Missing item(s)",
  "Wrong order",
  "Food quality issue",
  "Payment issue",
  "Other",
];

export default function Complaint() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const [reason, setReason] = useState(reasons[0]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Matches CreateComplaintRequest exactly: { customerId, orderId, complaintText }
      await complaintApi.create({
        customerId: getStoredCustomerId(),
        orderId,
        complaintText: details ? `${reason}: ${details}` : reason,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't submit your complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-2xl font-extrabold text-ink-900">File a Complaint</h1>

        <div className="card p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <p className="text-lg font-bold text-ink-900">Complaint submitted</p>
              <p className="mt-1 text-sm text-ink-400">
                Our support team will get back to you within 24 hours.
              </p>
              <button onClick={() => navigate("/orders")} className="btn-primary mt-5">
                Back to Orders
              </button>
            </div>
          ) : (
            <>
              {orderId && (
                <p className="mb-4 text-sm text-ink-500">
                  Order: <span className="font-semibold text-ink-800">{orderId}</span>
                </p>
              )}
              <label className="mb-1.5 block text-xs font-semibold text-ink-500">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input mb-4 !rounded-xl"
              >
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <label className="mb-1.5 block text-xs font-semibold text-ink-500">Details</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Describe what went wrong..."
                className="w-full rounded-2xl border border-ink-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />

              <button
                onClick={handleSubmit}
                disabled={!details.trim() || loading}
                className="btn-primary mt-5 w-full !py-3"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>

              {error && (
                <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
