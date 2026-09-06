import React from "react";
import { useSearchParams } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import Layout from "../components/Layout";
import WaitingTimeCard from "../components/WaitingTimeCard";
import useFetch from "../hooks/useFetch";
import orderApi from "../api/orderApi";
import waitingTimeApi from "../api/waitingTimeApi";
import { normalizeOrder } from "../mock/normalize";

const STATUS_STEPS = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

function stepsFromStatus(status) {
  const normalized = (status || "").toLowerCase();
  let doneUpTo = 0;
  if (normalized.includes("prepar")) doneUpTo = 1;
  else if (normalized.includes("way") || normalized.includes("deliver") && !normalized.includes("delivered")) doneUpTo = 2;
  else if (normalized.includes("delivered")) doneUpTo = 3;
  return STATUS_STEPS.map((label, i) => ({ label, done: i <= doneUpTo }));
}

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data: orderData } = useFetch(
    (signal) => (orderId ? orderApi.getById(orderId, { signal }) : Promise.resolve({ data: null })),
    [orderId],
    { fallback: null }
  );
  const { data: waitingTime } = useFetch(
    (signal) => (orderId ? waitingTimeApi.getByOrder(orderId, { signal }) : Promise.resolve({ data: null })),
    [orderId],
    { fallback: null }
  );

  const order = orderData ? normalizeOrder(orderData) : null;
  const waitMinutes = waitingTime?.estimatedMinutes ?? waitingTime?.minutes ?? 18;
  const steps = stepsFromStatus(order?.status);

  if (!orderId) {
    return (
      <Layout>
        <div className="card mx-auto max-w-lg py-16 text-center">
          <p className="font-semibold text-ink-800">No order selected</p>
          <p className="mt-1 text-sm text-ink-400">
            Open Track Order from an order in "My Orders" to see live status here.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-extrabold text-ink-900">Track Order</h1>

        <WaitingTimeCard
          minutes={waitMinutes}
          status={order ? `${order.status} — ${order.restaurantName}` : "Fetching status..."}
        />

        <div className="card p-6">
          <h2 className="mb-6 font-bold text-ink-900">{order?.id || orderId}</h2>
          <ol className="relative ml-3 space-y-8 border-l-2 border-dashed border-ink-200">
            {steps.map((step) => (
              <li key={step.label} className="ml-6">
                <span
                  className={`absolute -left-[11px] grid h-5 w-5 place-items-center rounded-full ${
                    step.done ? "bg-brand-500 text-white" : "bg-ink-200 text-ink-400"
                  }`}
                >
                  {step.done && <HiCheckCircle className="h-4 w-4" />}
                </span>
                <p className={`font-semibold ${step.done ? "text-ink-900" : "text-ink-400"}`}>
                  {step.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  );
}
