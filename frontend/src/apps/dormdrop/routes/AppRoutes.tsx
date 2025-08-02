import Landing from "@/apps/dormdrop/pages/Landing";
import CreateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/CreateSubleasePage";
import UpdateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/UpdateSubleasePage";
import SubleaseDetailPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseDetailPage";
import SubleaseListPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseListingPage";
import PrivateRoute from "@/routes/PrivateRoute";
import RouteLoader from "@/routes/RouteLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/apps/dormdrop/layout/MainLayout";
import SearchLayout from "@/apps/dormdrop/layout/SearchLayout";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      {/* Routes under MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Main Landing */}
        <Route index element={<Landing />} />

        {/* Public Sublease Pages */}
        <Route path="sublease/:id" element={<RouteLoader><SubleaseDetailPage /></RouteLoader>} />

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

      </Route>
      
      {/* Routes under MainLayout */}
      <Route path="/" element={<SearchLayout />}>
        {/* Public Sublease Pages */}
        <Route path="sublease" element={<RouteLoader><SubleaseListPage /></RouteLoader>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;