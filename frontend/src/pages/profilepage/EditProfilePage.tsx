import api from "@/lib/axios";
import { CalendarDays, Mail, School, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserAccount } from "@/types/UserAccount";

const EditProfilePage = () => {
  const [form, setForm] = useState<UserAccount | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/api/v2/user/account/me");
      setForm(res.data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      const payload = {
        ...form,
        password: password || undefined,
      };
      await api.put("/api/v2/user/account/me/update", payload);
      navigate("/account/me");
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const averageRating =
    form.sumOfRatings && form.numberOfRatings
      ? (form.sumOfRatings / form.numberOfRatings).toFixed(1)
      : "5.0";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-md rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-start"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={form.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
          />
          <input
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
            placeholder="Profile picture URL"
            className="mt-2 text-sm w-40 border border-gray-300 rounded-md px-2 py-1"
          />
        </div>

        {/* Editable Fields */}
        <div className="flex-1 space-y-4">
          <div>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="text-2xl font-bold text-gray-900 w-full border-b focus:outline-none"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="text-xl font-semibold text-gray-900 w-full border-b focus:outline-none mt-1"
              placeholder="Last Name"
            />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="text-gray-500 text-sm w-full border-b focus:outline-none mt-1"
              placeholder="Username"
            />
          </div>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span className="font-medium w-20">Email:</span>
              <span>{form.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <School size={16} className="text-gray-500" />
              <span className="font-medium w-20">School:</span>
              <span>{form.school}</span>
            </div>

            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <span className="font-medium w-20">Rating:</span>
              <span>{averageRating} ★</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gray-500" />
              <span className="font-medium w-20">Joined:</span>
              <span>{new Date(form.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Password */}
            <div className="pt-4 space-y-2">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/account/me")}
              className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;