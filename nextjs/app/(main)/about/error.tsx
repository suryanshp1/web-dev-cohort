"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-5xl font-bold text-red-600">Oops!</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-600 text-center max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>

      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}