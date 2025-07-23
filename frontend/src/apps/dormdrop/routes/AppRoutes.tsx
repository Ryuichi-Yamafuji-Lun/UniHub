// src/apps/dormdrop/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/apps/dormdrop/pages/Landing";
import SubleaseDetailPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseDetailPage";
import SubleaseListPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseListingPage";
import UpdateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/UpdateSubleasePage";
import CreateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/CreateSubleasePage";
import PrivateRoute from "@/routes/PrivateRoute";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      {/* Main Landing */}
      <Route index element={<Landing />} />

      {/* Public Sublease Pages */}
      <Route path="sublease" element={<SubleaseListPage />} />
      <Route path="sublease/:id" element={<SubleaseDetailPage />} />

      {/* Protected Sublease Actions */}
      <Route
        path="sublease/:subleaseId/edit"
        element={
          <PrivateRoute>
            <UpdateSubleasePage />
          </PrivateRoute>
        }
      />
      <Route
        path="sublease/new"
        element={
          <PrivateRoute>
            <CreateSubleasePage />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;