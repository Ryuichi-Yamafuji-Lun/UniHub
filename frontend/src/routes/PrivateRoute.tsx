import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, checked } = useAuth();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 300); 

    return () => clearTimeout(timer);
  }, []);

  if (!checked) {
    return showLoading ? (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    ) : null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;