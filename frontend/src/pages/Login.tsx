import api from "@/lib/axios";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function

  // Helper function to get the redirect path from URL parameters
  const getRedirectPath = () => {
    const params = new URLSearchParams(location.search);
    const redirectParam = params.get("redirect");
    return redirectParam ? decodeURIComponent(redirectParam) : "/";
  };

  const redirectPath = getRedirectPath();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("token", token);
    navigate(redirectPath, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await api.post("/api/v1/public/auth/login", {
        identifier,
        password,
      });
      handleLoginSuccess(response.data.token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed:", err.response?.data);
        if (err.response?.status === 401) {
          setError("Invalid email/username or password.");
        } else if (err.response?.status === 429) {
          setError("Too many login attempts. Please try again later.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError("");
    console.log("Google Sign-In Success, received credential:", credentialResponse);

    try {
      const response = await api.post("/api/v1/public/auth/google-login", {
        credential: credentialResponse.credential,
      });
      handleLoginSuccess(response.data.token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Backend Google login failed:", err.response?.data);
        const status = err.response?.status;
        const message = err.response?.data?.message || "An unknown error occurred.";

        if (status === 404) {
          setError(`${message} Please sign up first.`);
        } else if (status === 412 || status === 428) { 
          setError(`${message} Please complete your profile first.`);
        } else {
          setError("Google login failed. Please try again.");
        }
      } else {
        console.error("Unexpected error during Google login:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed");
    setError("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1e1e1e]">Log in to UniHub</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Use your username or school email to access UniHub.
          </p>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="rectangular"
            theme="outline"
            size="large"
            width="320px"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="w-full border-t border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="w-full border-t border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#084479]"
              placeholder="you@school.edu or username"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#084479] pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#084479] text-white py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#084479] font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-xs text-center text-gray-500 mt-4">
          By continuing, you agree to UniHub's{" "}
          <a href="/terms" className="underline hover:text-gray-800">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-gray-800">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;