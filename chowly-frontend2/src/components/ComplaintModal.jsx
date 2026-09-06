import React, { useState } from "react";
import Modal from "./Modal";
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

export default function ComplaintModal({ open, onClose, orderId, onSubmitted }) {
  const [reason, setReason] = useState(reasons[0]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Matches CreateComplaintRequest exactly: { customerId, orderId, complaintText }.
      // There's only one free-text field on the backend, so the reason
      // dropdown is folded into it for context.
      await complaintApi.create({
        customerId: getStoredCustomerId(),
        orderId,
        complaintText: details ? `${reason}: ${details}` : reason,
      });
      onSubmitted?.();
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't submit your complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="File a Complaint">
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
        rows={4}
        placeholder="Describe what went wrong..."
        className="w-full rounded-2xl border border-ink-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />

      <button
        onClick={handleSubmit}
        disabled={!details.trim() || loading}
        className="btn-primary mt-4 w-full !py-3"
      >
        {loading ? "Submitting..." : "Submit Complaint"}
      </button>

      {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
    </Modal>
  );
}
