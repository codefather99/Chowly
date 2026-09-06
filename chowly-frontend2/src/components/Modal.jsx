import React, { useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";

export default function Modal({ open, onClose, title, children, maxWidth = "max-w-md" }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative w-full ${maxWidth} card animate-[fadeIn_.15s_ease-out] p-6`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink-900">{title}</h3>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-400 hover:bg-ink-100"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
