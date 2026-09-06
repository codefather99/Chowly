import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import Layout from "../components/Layout";
import ratingApi from "../api/ratingApi";
import { getStoredCustomerId } from "../session";

export default function Rating() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const restaurantName = searchParams.get("restaurant") || "your restaurant";
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't submit your rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-2xl font-extrabold text-ink-900">Rate your Order</h1>

        <div className="card p-6 text-center">
          {submitted ? (
            <div className="py-8">
              <p className="text-lg font-bold text-ink-900">Thanks for your feedback!</p>
              <p className="mt-1 text-sm text-ink-400">It helps other customers choose better.</p>
              <button onClick={() => navigate("/orders")} className="btn-primary mt-5">
                Back to Orders
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-ink-500">
                How was your experience with{" "}
                <span className="font-semibold text-ink-800">{restaurantName}</span>?
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
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
                        <HiStar className="h-10 w-10 text-yellow-400" />
                      ) : (
                        <HiOutlineStar className="h-10 w-10 text-ink-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more (optional)..."
                rows={4}
                className="mt-5 w-full rounded-2xl border border-ink-200 px-4 py-3 text-left text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />

              <button
                onClick={handleSubmit}
                disabled={!rating || loading}
                className="btn-primary mt-5 w-full !py-3"
              >
                {loading ? "Submitting..." : "Submit Rating"}
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
