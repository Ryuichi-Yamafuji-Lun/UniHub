// src/pages/Signup.tsx
import api from "@/lib/axios";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend validations
    if (!form.email.includes("@")) {
      return setError("Please enter a valid email.");
    }
    if (form.username.length < 3 || form.username.length > 20) {
      return setError("Username must be between 3 and 20 characters.");
    }
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await api.post("api/v2/public/account", {
        ...form,
        dateOfBirth: form.dateOfBirth || null,
      });
      navigate("/check-email");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Signup failed. Try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#084479]">Sign Up</h2>
        {error && <div className="text-red-600 mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="USC Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />

          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md pr-10"
            />
          </div>

          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md pr-10"
            />

            {/* Show one icon for both password fields */}
            <span
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name (optional)"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name (optional)"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />

          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth (optional)"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-[#084479] text-white py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;