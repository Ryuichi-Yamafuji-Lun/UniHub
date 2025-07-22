import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, checked } = useAuth();

  if (!checked) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;