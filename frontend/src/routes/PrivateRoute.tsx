import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, checked } = useAuth();
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!checked || !minDelayPassed) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;