// src/pages/VerifyEmail.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    axios
      .get(`/api/v1/verify?token=${token}`)
      .then(() => {
        setStatus("success");
        setMessage("Your email has been successfully verified!");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Verification failed. Your token may have expired."
        );
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <div className="text-gray-600 text-lg">{message}</div>
        )}

        {status === "success" && (
          <div>
            <h1 className="text-2xl font-bold text-[#084479] mb-4">Email Verified</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#084479] text-white px-4 py-2 rounded-md hover:bg-[#06345d] transition"
            >
              Go to Login
            </button>
          </div>
        )}

        {status === "error" && (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/signup"
              className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Go Back to Sign Up
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;