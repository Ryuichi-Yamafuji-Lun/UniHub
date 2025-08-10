import api from "@/lib/axios";
import axios from "axios";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserAccount } from "@/types/UserAccount";

const EditProfilePage = () => {
  const [form, setForm] = useState<UserAccount | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({ curr: false, pass: false, confirm: false, del: false });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/v2/user/account/me");
        setForm(res.data);
      } catch {
        setError("Failed to load your profile.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password) {
      if (form?.hasPassword && !currentPassword) return setError("Current password is required to set a new one.");
      if (password.length < 8) return setError("New password must be at least 8 characters.");
      if (password !== confirmPassword) return setError("New passwords do not match.");
    }
    if (!form?.username) return setError("Username is required.");

    try {
      const payload = { ...form, currentPassword: currentPassword || undefined, password: password || undefined };
      await api.put("/api/v2/user/account/me/update", payload);
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/account/me"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update profile.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    setError(null);
    try {
      const payload = { password: deletePassword };
      await api.delete("/api/v2/user/account/me/delete", { data: payload });
      localStorage.removeItem("token");
      navigate("/?account_deleted=true");
    } catch (err: unknown) {
       if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Deletion failed.");
      } else {
        setError("An unexpected error occurred during deletion.");
      }
    }
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your profile, password, and account settings.</p>
          </header>

          {/* --- Profile Details Section --- */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-800">Profile Details</h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-2 w-full sm:w-40 flex-shrink-0">
                  <img src={form.profilePicture || `https://ui-avatars.com/api/?name=${form.firstName}+${form.lastName}&background=random`} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm" />
                  <input name="profilePicture" value={form.profilePicture || ''} onChange={handleChange} placeholder="Image URL" className="mt-2 text-sm w-full border border-gray-300 rounded-md px-2 py-1 text-center" />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700">First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700">Username</label><input name="username" value={form.username} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" /></div>
                </div>
              </div>
            </div>
            
            {/* --- Password Section --- */}
            <div className="bg-gray-50 p-6 sm:p-8 border-t">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {form.hasPassword && (
                  <div className="relative sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input type={showPassword.curr ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Required to change password" className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md pr-10" />
                    <button type="button" onClick={() => setShowPassword(p => ({ ...p, curr: !p.curr }))} className="absolute right-0 top-8 flex items-center px-3 text-gray-500">{showPassword.curr ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                )}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input type={showPassword.pass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep" className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md pr-10" />
                  <button type="button" onClick={() => setShowPassword(p => ({ ...p, pass: !p.pass }))} className="absolute right-0 top-8 flex items-center px-3 text-gray-500">{showPassword.pass ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type={showPassword.confirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md pr-10" />
                  <button type="button" onClick={() => setShowPassword(p => ({ ...p, confirm: !p.confirm }))} className="absolute right-0 top-8 flex items-center px-3 text-gray-500">{showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
              </div>
            </div>

            {/* --- Actions and Messages --- */}
            <div className="p-6 sm:p-8 bg-gray-50 border-t flex justify-between items-center">
              <div className="flex-grow">
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => navigate("/account/me")} className="px-4 py-2 text-sm font-medium bg-white text-gray-800 border rounded-md hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Save Changes</button>
              </div>
            </div>
          </form>

          {/* --- Delete Account Section --- */}
          <div className="bg-white border border-red-300 shadow-sm rounded-xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-red-800">Delete Account</h2>
            <p className="mt-1 text-sm text-gray-600">Permanently delete your account and all of your content. This action is not reversible.</p>
            <div className="mt-4">
              <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition">Delete My Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Delete Account Modal --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-start gap-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0">
                <ShieldAlert className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-0 text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Account</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.</p>
                </div>
              </div>
            </div>
            {form.hasPassword && (
              <div className="mt-4 relative">
                <label className="block text-sm font-medium text-gray-700">Confirm with password</label>
                <input type={showPassword.del ? "text" : "password"} value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="Enter your password" className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md pr-10" />
                <button type="button" onClick={() => setShowPassword(p => ({ ...p, del: !p.del }))} className="absolute right-0 top-8 flex items-center px-3 text-gray-500">{showPassword.del ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
            )}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse gap-3">
              <button type="button" onClick={handleDeleteAccount} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:w-auto sm:text-sm">Confirm Deletion</button>
              <button type="button" onClick={() => { setIsDeleteModalOpen(false); setError(null); }} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;