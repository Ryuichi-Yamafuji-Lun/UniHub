// src/apps/dormdrop/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/apps/dormdrop/pages/Landing";
import MainLayout from "@/apps/dormdrop/layout/MainLayout";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <MainLayout>
            <Landing />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;
