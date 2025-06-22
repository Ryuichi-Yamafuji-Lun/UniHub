// src/apps/dormdrop/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/apps/dormdrop/pages/Landing";
import MainLayout from "@/apps/dormdrop/layout/MainLayout";
import SubleaseDetailPage from "@/apps/dormdrop/pages/subleasepage/SubleaseDetailPage";
import SubleaseListPage from "@/apps/dormdrop/pages/subleasepage/SubleaseListingPage";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout><Landing /></MainLayout>}/>

      {/* Sublease Paths */}
      <Route path="sublease/:id" element={<SubleaseDetailPage />} />
      <Route path="listings" element={<SubleaseListPage />} />

      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;
