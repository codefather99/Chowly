import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-50 px-4 text-center">
      <div>
        <p className="text-6xl font-extrabold text-brand-500">404</p>
        <p className="mt-2 text-lg font-semibold text-ink-800">Page not found</p>
        <Link to="/" className="btn-primary mt-5">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
