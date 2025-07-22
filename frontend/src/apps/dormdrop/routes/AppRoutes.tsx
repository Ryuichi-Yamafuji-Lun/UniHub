// src/apps/dormdrop/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/apps/dormdrop/pages/Landing";
import MainLayout from "@/apps/dormdrop/layout/MainLayout";
import SubleaseDetailPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseDetailPage";
import SubleaseListPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseListingPage";
import UpdateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/UpdateSubleasePage";
import CreateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/CreateSubleasePage";
import PrivateRoute from "@/routes/PrivateRoute";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout><Landing /></MainLayout>}/>

      {/* Sublease Paths */}
      <Route path="sublease/:id" element={<MainLayout><SubleaseDetailPage /></MainLayout>} />
      <Route path="sublease" element={<MainLayout><SubleaseListPage /></MainLayout>} />
      <Route path="sublease/:subleaseId/edit" element={<PrivateRoute><MainLayout><UpdateSubleasePage /></MainLayout></PrivateRoute>} />
      <Route path="sublease/new" element={<PrivateRoute><MainLayout><CreateSubleasePage /></MainLayout></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;
