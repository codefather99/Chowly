import React, { useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import Modal from "./Modal";
import ratingApi from "../api/ratingApi";
import { getStoredCustomerId } from "../session";

export default function RatingModal({ open, onClose, orderId, restaurantName, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Matches CreateRatingRequest exactly: { customerId, orderId, ratingScore, reviewText }
      await ratingApi.create({
        customerId: getStoredCustomerId(),
        orderId,
        ratingScore: rating,
        reviewText: comment,
      });
      onSubmitted?.(rating);
      onClose?.();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Couldn't submit your rating. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Rate your order">
      <p className="mb-4 text-sm text-ink-500">
        How was your experience with <span className="font-semibold text-ink-800">{restaurantName}</span>?
      </p>

      <div className="flex items-center justify-center gap-2 py-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = (hovered || rating) >= star;
          return (
            <button
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
            >
              {filled ? (
                <HiStar className="h-9 w-9 text-yellow-400" />
              ) : (
                <HiOutlineStar className="h-9 w-9 text-ink-300" />
              )}
            </button>
          );
        })}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us more (optional)..."
        rows={3}
        className="mt-3 w-full rounded-2xl border border-ink-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />

      <button
        onClick={handleSubmit}
        disabled={!rating || loading}
        className="btn-primary mt-4 w-full !py-3"
      >
        {loading ? "Submitting..." : "Submit Rating"}
      </button>

      {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
    </Modal>
  );
}
