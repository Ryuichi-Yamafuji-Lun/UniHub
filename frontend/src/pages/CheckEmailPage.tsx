// src/pages/CheckEmailPage.tsx
import { Link } from "react-router-dom";

const CheckEmailPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-[#084479] mb-4">Almost there!</h1>
      <p className="text-gray-600 max-w-md mb-6">
        We’ve sent a confirmation link to your email. Please check your inbox (and spam folder)
        to verify your account.
      </p>
      <p className="text-sm text-gray-500 mb-6">Didn’t receive an email?</p>
      <Link
        to="/login"
        className="text-sm text-[#084479] underline hover:text-[#06345d] transition"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default CheckEmailPage;