import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";

import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import Signup from "@/pages/Signup";
import VerifyEmail from "@/pages/VerifyEmail";
import CheckEmailPage from "@/pages/CheckEmailPage";

import UserProfilePage from "@/pages/profilepage/UserProfilePage";
import EditProfilePage from "@/pages/profilepage/EditProfilePage";
import PublicAccountProfile from "@/pages/profilepage/PublicProfilePage";

import DormDropAppRoutes from "@/apps/dormdrop/routes/AppRoutes";
import MySubleaseListingPage from "@/apps/dormdrop/pages/subleasepage/private/MySubleasePage";
import RouteLoader from "./RouteLoader";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fef6e4] text-gray-500">Loading...</div>}>
      <Routes>
        {/* Auth Pages - no MainLayout */}
        <Route path="/login" element={<RouteLoader><AuthLayout><LoginPage /></AuthLayout></RouteLoader>} />
        <Route path="/signup" element={<RouteLoader><AuthLayout><Signup /></AuthLayout></RouteLoader>} />
        <Route path="/verify" element={<RouteLoader><AuthLayout><VerifyEmail /></AuthLayout></RouteLoader>} />
        <Route path="/check-email" element={<RouteLoader><AuthLayout><CheckEmailPage /></AuthLayout></RouteLoader>} />

        {/* DormDrop Route */}
        <Route path="dormdrop/*" element={<DormDropAppRoutes />} />

        {/* Routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Public */}
          <Route index element={<Landing />} />
          
          <Route path="account/:userId" element={<PrivateRoute><PublicAccountProfile /></PrivateRoute>} />

          {/* Private */}
          <Route path="account/me" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="account/me/edit" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
          <Route path="account/me/sublease" element={<PrivateRoute><MySubleaseListingPage /></PrivateRoute>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<RouteLoader><Navigate to="/" replace /></RouteLoader>} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;