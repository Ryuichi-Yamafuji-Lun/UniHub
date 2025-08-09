import DormDropMainLayout from "@/apps/dormdrop/layout/DormDropMainLayout";
import DormDropSearchLayout from "@/apps/dormdrop/layout/DormDropSearchLayout";
import Landing from "@/apps/dormdrop/pages/Landing";
import CreateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/CreateSubleasePage";
import UpdateSubleasePage from "@/apps/dormdrop/pages/subleasepage/private/UpdateSubleasePage";
import SubleaseDetailPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseDetailPage";
import SubleaseListPage from "@/apps/dormdrop/pages/subleasepage/public/SubleaseListingPage";
import PrivateRoute from "@/routes/PrivateRoute";
import RouteLoader from "@/routes/RouteLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import DormDropLandingLayout from "@/apps/dormdrop/layout/DormDropLandingLayout";

const DormDropAppRoutes = () => {
  return (
    <Routes>
      {/* Routes under LandingLayout */}
      <Route path="/" element={<DormDropLandingLayout />}>
        {/* Main Landing */}
        <Route index element={<Landing />} />
      </Route>
      {/* Routes under MainLayout */}
      <Route path="/" element={<DormDropMainLayout />}>
        

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
      
      {/* Routes under SearchLayout */}
      <Route path="/" element={<DormDropSearchLayout />}>
        {/* Public Sublease Pages */}
        <Route path="sublease" element={<RouteLoader><SubleaseListPage /></RouteLoader>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dormdrop" replace />} />
    </Routes>
  );
};

export default DormDropAppRoutes;