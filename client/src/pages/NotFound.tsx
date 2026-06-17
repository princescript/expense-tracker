import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-gray-500">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-emerald-500 px-4 py-2 text-white"
      >
        Go Home
      </Link>
    </div>
  );
}