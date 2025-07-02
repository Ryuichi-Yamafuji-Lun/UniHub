// src/apps/dormdrop/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/apps/dormdrop/pages/Landing";
import MainLayout from "@/apps/dormdrop/layout/MainLayout";
import SubleaseDetailPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseDetailPage";
import SubleaseListPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseListingPage";
import UpdateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/UpdateSubleasePage";
import CreateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/CreateSubleasePage";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout><Landing /></MainLayout>}/>

      {/* Sublease Paths */}
      <Route path="sublease/:id" element={<SubleaseDetailPage />} />
      <Route path="listings" element={<SubleaseListPage />} />
      <Route path="sublease/:subleaseId/edit" element={<UpdateSubleasePage />} />
      <Route path="sublease/new" element={<CreateSubleasePage />} />

      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;
