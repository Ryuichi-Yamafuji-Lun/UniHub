import DormDropAppRoutes from "@/apps/dormdrop/routes/AppRoutes";
import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";
import CheckEmailPage from "@/pages/CheckEmailPage";
import Landing from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import EditProfilePage from "@/pages/profilepage/EditProfilePage";
import PublicAccountProfile from "@/pages/profilepage/PublicProfilePage";
import UserProfilePage from "@/pages/profilepage/UserProfilePage";
import Signup from "@/pages/Signup";
import VerifyEmail from "@/pages/VerifyEmail";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MainLayout><Landing /></MainLayout>} />

        {/* Auth Page */}
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
        <Route path="/verify" element={<AuthLayout><VerifyEmail /></AuthLayout>} />
        <Route path="/check-email" element={<AuthLayout><CheckEmailPage /></AuthLayout>} />

        {/* DormDrop Pages */}
        <Route path="/dormdrop/*" element={<DormDropAppRoutes />} />

        {/* Account Pages */}
        <Route path="/account/:ownerId" element={<PublicAccountProfile />} />
        <Route path="/account/me" element={<UserProfilePage />} />
        <Route path="/account/edit" element={<EditProfilePage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;