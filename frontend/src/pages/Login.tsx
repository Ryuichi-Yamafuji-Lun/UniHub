import api from "@/lib/axios";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/public/auth/login", {
        identifier,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate(redirect);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#fef6e4]">
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1e1e1e]">Log in to UniHub</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Use your username or school email to access Unihub.
          </p>
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#084479] text-white py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#084479] font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-xs text-center text-gray-500 mt-4">
          By continuing, you agree to UniHub’s{" "}
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