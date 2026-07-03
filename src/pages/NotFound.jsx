import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <Compass size={40} className="text-steel" />
      <h1 className="mt-4 font-display text-3xl font-bold">Wrong turn</h1>
      <p className="mt-2 text-steel">That page doesn't exist. Let's get you back on the road.</p>
      <Link to="/" className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
        Back to home
      </Link>
    </div>
  );
}
