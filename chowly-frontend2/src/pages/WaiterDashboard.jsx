import React, { useEffect, useState } from "react";
import { HiOutlineClipboardList, HiOutlineCheckCircle, HiOutlineUserGroup } from "react-icons/hi";
import Layout from "../components/Layout";
import orderApi from "../api/orderApi";
import staffApi from "../api/staffApi";
import assignmentApi from "../api/assignmentApi";
import { normalizeOrders } from "../mock/normalize";
import { formatNaira } from "../mock/mockData";

// Matches OrderStatus exactly: PLACED, PREPARING, FINISHED, DELIVERED, CANCELLED.
// There is no literal "SERVED" value - DELIVERED is the closest match for
// "the order has been served to the customer" in a dine-in context.
const SERVED_STATUS = "DELIVERED";

export default function WaiterDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [staffId, setStaffId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    orderApi
      .getAll()
      .then((res) => setOrders(normalizeOrders(res.data)))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
    staffApi
      .getAll()
      .then((res) => setStaff(Array.isArray(res.data) ? res.data : []))
      .catch(() => setStaff([]));
  }, []);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  // NOTE: OrderAssignment.order_id is unique in the schema as implemented,
  // so exactly ONE staff member can be linked to an order - not a separate
  // chef and bartender at once. This assigns whichever staff member (of any
  // role) is responsible for seeing the order through.
  const handleAssign = async () => {
    if (!staffId) return;
    setAssigning(true);
    setActionError(null);
    setActionMessage(null);
    try {
      await assignmentApi.assignStaffToOrder(selectedOrderId, staffId);
      setActionMessage("Staff assigned to this order.");
    } catch (err) {
      setActionError(
        err?.response?.data?.message ||
          "Couldn't record the assignment (an order can only have one assignment)."
      );
    } finally {
      setAssigning(false);
    }
  };

  const handleMarkServed = async () => {
    setAssigning(true);
    setActionError(null);
    setActionMessage(null);
    try {
      await orderApi.updateStatus(selectedOrderId, SERVED_STATUS);
      setActionMessage("Order marked as served.");
      loadOrders();
    } catch (err) {
      setActionError(err?.response?.data?.message || "Couldn't update order status.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center gap-2">
        <HiOutlineClipboardList className="h-6 w-6 text-brand-500" />
        <h1 className="text-2xl font-extrabold text-ink-900">Incoming Orders</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="card p-4">
          {loading ? (
            <p className="py-10 text-center text-ink-400">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="py-10 text-center text-ink-400">No orders yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setStaffId("");
                    setActionError(null);
                    setActionMessage(null);
                  }}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    selectedOrderId === order.id
                      ? "border-brand-400 bg-brand-50"
                      : "border-ink-100 hover:bg-ink-50"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-ink-900">{order.id}</p>
                    <p className="text-xs text-ink-400">
                      {order.restaurantName} • {order.itemsCount} items
                    </p>
                  </div>
                  <span className="badge bg-ink-100 text-ink-600">{order.status}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          {!selectedOrder ? (
            <p className="py-10 text-center text-ink-400">
              Select an order to assign staff or mark it served.
            </p>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-ink-900">{selectedOrder.id}</h2>
                <p className="text-sm text-ink-400">
                  {selectedOrder.restaurantName} • {formatNaira(selectedOrder.total)} •{" "}
                  {selectedOrder.status}
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-ink-800">
                  <HiOutlineUserGroup className="h-4 w-4 text-brand-500" />
                  Assign Staff
                </h3>
                <label className="mb-1 block text-xs font-semibold text-ink-500">
                  Staff member (chef, bartender, or waiter)
                </label>
                <select
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="input !rounded-xl"
                >
                  <option value="">Select staff...</option>
                  {staff.map((s) => (
                    <option key={s.id ?? s.staffId} value={s.id ?? s.staffId}>
                      {s.name ?? s.staffName} ({s.role ?? s.staffRole})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssign}
                  disabled={!staffId || assigning}
                  className="btn-secondary mt-3"
                >
                  Save Assignment
                </button>
              </div>

              <div className="border-t border-ink-100 pt-4">
                <button
                  onClick={handleMarkServed}
                  disabled={assigning}
                  className="btn-primary w-full !py-3"
                >
                  <HiOutlineCheckCircle className="h-5 w-5" />
                  Mark Order as Served
                </button>
              </div>

              {actionMessage && (
                <p className="rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                  {actionMessage}
                </p>
              )}
              {actionError && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{actionError}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
