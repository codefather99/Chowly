import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineExclamationCircle, HiOutlineStar } from "react-icons/hi";
import Layout from "../components/Layout";
import WaitingTimeCard from "../components/WaitingTimeCard";
import RatingModal from "../components/RatingModal";
import ComplaintModal from "../components/ComplaintModal";
import useFetch from "../hooks/useFetch";
import orderApi from "../api/orderApi";
import waitingTimeApi from "../api/waitingTimeApi";
import { orders as mockOrders, formatNaira } from "../mock/mockData";
import { normalizeOrder } from "../mock/normalize";

export default function OrderDetails() {
  const { id } = useParams();
  const [showRating, setShowRating] = useState(false);
  const [showComplaint, setShowComplaint] = useState(false);

  const { data } = useFetch((signal) => orderApi.getById(id, { signal }), [id], {
    fallback: mockOrders.find((o) => o.id === id) || { ...mockOrders[0], id },
  });

  const { data: waitingTime } = useFetch(
    (signal) => waitingTimeApi.getByOrder(id, { signal }),
    [id],
    { fallback: null }
  );

  const order =
    data && (data.id || data.orderId)
      ? normalizeOrder(data)
      : mockOrders.find((o) => o.id === id) || { ...mockOrders[0], id };

  const waitMinutes = waitingTime?.estimatedMinutes ?? waitingTime?.minutes ?? 22;

  return (
    <Layout>
      <Link to="/orders" className="mb-4 flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-brand-500">
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold text-ink-900">{order.id}</h1>
                <p className="text-sm text-ink-400">{order.restaurantName}</p>
              </div>
              <span className="badge bg-brand-50 text-brand-600">{order.status}</span>
            </div>
          </div>

          <WaitingTimeCard minutes={waitMinutes} status={`${order.status} — ${order.restaurantName}`} />

          <div className="card p-5">
            <h2 className="mb-3 font-bold text-ink-900">Order Summary</h2>
            <div className="flex justify-between border-t border-dashed border-ink-200 pt-3 text-sm text-ink-500">
              <span>{order.itemsCount} items</span>
              <span className="font-bold text-ink-900">{formatNaira(order.total)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setShowRating(true)} className="btn-secondary flex-1">
              <HiOutlineStar className="h-4 w-4" />
              Rate Order
            </button>
            <button onClick={() => setShowComplaint(true)} className="btn-secondary flex-1">
              <HiOutlineExclamationCircle className="h-4 w-4" />
              Report Issue
            </button>
          </div>
        </div>

        <div className="card h-fit p-5">
          <h2 className="mb-3 font-bold text-ink-900">Delivery Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-400">Order ID</dt>
              <dd className="text-right font-medium text-ink-800">{order.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Status</dt>
              <dd className="font-medium text-ink-800">{order.status}</dd>
            </div>
          </dl>
        </div>
      </div>

      <RatingModal
        open={showRating}
        onClose={() => setShowRating(false)}
        orderId={id}
        restaurantName={order.restaurantName}
      />
      <ComplaintModal open={showComplaint} onClose={() => setShowComplaint(false)} orderId={id} />
    </Layout>
  );
}
