// src/pages/VerifyEmail.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    axios
      .get(`/api/v1/verify?token=${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-[#084479] mx-auto" size={40} />
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-bg px-4">
        <div className="text-center space-y-6">
          <CheckCircle size={48} className="text-green-600 mx-auto" />
          <h1 className="text-2xl font-bold text-[#084479]">Email Confirmed!</h1>
          <p className="text-gray-600">Your email has been successfully verified. You can now log in to UniHub.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#084479] text-white px-6 py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-6">
        <XCircle size={48} className="text-red-600 mx-auto" />
        <h1 className="text-2xl font-bold text-red-600">Invalid or Expired Link</h1>
        <p className="text-gray-600">Please request a new verification email or sign up again.</p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Go to Signup
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
