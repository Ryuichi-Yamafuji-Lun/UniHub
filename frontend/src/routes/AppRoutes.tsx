import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
      <Route path="/login" element={<LoginPage />} />
      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;