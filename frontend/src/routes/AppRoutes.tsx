import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import AuthLayout from "@/layout/AuthLayout";
import Signup from "@/pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;