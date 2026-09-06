import React from "react";
import { HiOutlineClock, HiOutlineTruck } from "react-icons/hi";

export default function WaitingTimeCard({ minutes = 25, status = "Preparing your order" }) {
  const progress = Math.max(10, Math.min(100, 100 - minutes * 2));

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
          <HiOutlineClock className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm text-ink-400">Estimated waiting time</p>
          <p className="text-xl font-extrabold text-ink-900">{minutes} mins</p>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-ink-600">
        <HiOutlineTruck className="h-4 w-4 text-brand-500" />
        {status}
      </div>
    </div>
  );
}
