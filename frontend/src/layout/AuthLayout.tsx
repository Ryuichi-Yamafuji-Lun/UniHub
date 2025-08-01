// src/layout/AuthLayout.tsx
import type { ReactNode } from "react";
import MinimalNavBar from "@/components/layout/navbar/MinimalNavbar";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative bg-primary-bg min-h-screen">
      {/* Floating logo */}
      <MinimalNavBar />

      {/* form */}
      <div className="h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;