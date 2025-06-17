import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import AuthLayout from "@/layout/AuthLayout";
import Signup from "@/pages/Signup";
import VerifyEmail from "@/pages/VerifyEmail";
import CheckEmailPage from "@/pages/CheckEmailPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
      {/* Auth Page */}
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
      <Route path="/verify" element={<AuthLayout><VerifyEmail /></AuthLayout>} />
      <Route path="/check-email" element={<AuthLayout><CheckEmailPage /></AuthLayout>} />
      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;