// src/pages/CheckEmail.tsx
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

const CheckEmail = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <MailCheck size={48} className="mx-auto text-[#084479]" />
        <h2 className="text-2xl font-bold text-gray-900">Check your inbox</h2>
        <p className="text-gray-600 text-sm">
          We've sent a verification email to your USC email. Click the link inside to confirm your account and start using UniHub.
        </p>
        <p className="text-gray-500 text-xs">
          Didn't get the email? Try checking your spam folder or wait a few minutes.
        </p>
        <Link
          to="/login"
          className="inline-block bg-[#084479] text-white px-6 py-2 rounded-md hover:bg-[#06345d] transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default CheckEmail;