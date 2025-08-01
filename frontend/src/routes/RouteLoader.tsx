import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const RouteLoader = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-[#212529] text-xl font-medium animate-pulse">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteLoader;