import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/login", {
        identifier,
        password,
      });

      //Login success — redirect or set auth state
      navigate("/dormdrop");
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#084479]">Log in to UniHub</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Use your username or USC email to access DormDrop.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email or Username</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#084479]"
              placeholder="you@usc.edu or username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#084479]"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#084479] text-white py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to UniHub’s{" "}
          <a href="/terms" className="underline hover:text-gray-800">Terms & Conditions</a> and{" "}
          <a href="/privacy" className="underline hover:text-gray-800">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;