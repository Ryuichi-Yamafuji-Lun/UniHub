import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Landing from "@/pages/Landing";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<MainLayout><Landing /></MainLayout>} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;