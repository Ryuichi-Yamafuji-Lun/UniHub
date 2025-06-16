import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import AuthLayout from "@/layout/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;