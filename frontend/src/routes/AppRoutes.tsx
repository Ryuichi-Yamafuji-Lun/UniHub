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

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fef6e4] text-gray-500">Loading...</div>}>
      <Routes>

        {/* Auth Pages - no MainLayout */}
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
        <Route path="/verify" element={<AuthLayout><VerifyEmail /></AuthLayout>} />
        <Route path="/check-email" element={<AuthLayout><CheckEmailPage /></AuthLayout>} />

        {/* Routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Public */}
          <Route index element={<Landing />} />
          <Route path="dormdrop/*" element={<DormDropAppRoutes />} />
          <Route path="account/:userId" element={<PrivateRoute><PublicAccountProfile /></PrivateRoute>} />

          {/* Private */}
          <Route path="account/me" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="account/me/edit" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
          <Route path="account/me/sublease" element={<PrivateRoute><MySubleaseListingPage /></PrivateRoute>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;