import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

const EditProfilePage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: ""
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const res = await api.get("/api/v2/user/account/me");
      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        username: res.data.username || "",
        password: "",
        confirmPassword: "",
        profilePicture: res.data.profilePicture || "",
      });
    };
    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setError(null);

    // If password is filled, validate length and confirmation
    if (form.password) {
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      // Send only relevant fields (optional optimization)
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        profilePicture: form.profilePicture,
        password: form.password || undefined, // send undefined if empty to skip update
      };
      await api.put("/api/v2/user/account/me/update", payload);
      navigate("/account/me");
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold mb-6 text-center">Edit Profile</h2>

      {error && (
        <p className="text-red-600 text-center mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Confirm new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Profile Picture URL</label>
          <input
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#084479] text-white py-2 rounded-md hover:bg-[#06345d]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;