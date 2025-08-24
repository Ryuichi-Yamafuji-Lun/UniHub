import api from "@/lib/axios";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { isAllowedEmail } from "@/types/enums/Email";
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import imageCompression from 'browser-image-compression'; // 1. IMPORT THE LIBRARY

interface GoogleJwtPayload {
  given_name: string;
  family_name: string;
  email: string;
}

const Signup = () => {
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
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

  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [googleCredential, setGoogleCredential] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({ pass: false, confirm: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: GoogleJwtPayload = jwtDecode(credentialResponse.credential);
      
      if (!isAllowedEmail(decoded.email)) {
        setError("Sorry, UniHub is not available for your school or email domain.");
        return;
      }

      setGoogleCredential(credentialResponse.credential);
      setForm(prev => ({
        ...prev,
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        password: "",
        confirmPassword: "",
      }));
      setError(null);
    }
  };

  // 2. UPDATE THIS FUNCTION
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);

    // --- Validation Logic ---
    if (!form.firstName || !form.lastName) return setError("First and last name are required.");
    if (!form.dateOfBirth) return setError("Date of birth is required.");
    if (!form.username) return setError("Username is required.");
    if (form.username.length < 3 || form.username.length > 20) return setError("Username must be between 3 and 20 characters.");
    if (new Date(form.dateOfBirth) > new Date()) return setError("Date of birth cannot be in the future.");

    if (!googleCredential) {
      if (!isAllowedEmail(form.email)) return setError("Only school emails are allowed, or UniHub is not available for your school.");
      if (form.password.length < 8) return setError("Password must be at least 8 characters long.");
      if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      let finalProfilePicture = profilePictureFile;
      if (profilePictureFile) {
        console.log(`Original profile picture size: ${(profilePictureFile.size / 1024 / 1024).toFixed(2)} MB`);
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 512,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(profilePictureFile, options);
          console.log(`Compressed profile picture size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
          finalProfilePicture = compressedFile;
        } catch (compressionError) {
          console.error("Error compressing profile picture, using original file.", compressionError);
        }
      }

      if (googleCredential) {
        // --- Handle Google Signup Submission ---
        const googleData = {
          credential: googleCredential,
          username: form.username,
          dateOfBirth: form.dateOfBirth,
        };
        formData.append('googleData', new Blob([JSON.stringify(googleData)], { type: 'application/json' }));
        
        if (finalProfilePicture) {
          formData.append('profilePicture', finalProfilePicture);
        }

        await api.post("api/v2/public/account/google", formData);
        navigate(`/login?source=google-signup`);

      } else {
        // --- Handle Standard Signup Submission ---
        formData.append('userData', new Blob([JSON.stringify(form)], { type: 'application/json' }));

        if (finalProfilePicture) {
          formData.append('profilePicture', finalProfilePicture);
        }

        await api.post("api/v2/public/account", formData);
        navigate(`/check-email?redirect=${redirect}`);
      }
    } catch (err: unknown)
     {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-500 text-sm mt-2">Join UniHub and get started.</p>
        </div>

        {!googleCredential && (
          <>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google signup failed. Please try again.")}
                text="signup_with"
                shape="rectangular"
                theme="outline"
                size="large"
                width="320px"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="w-full border-t border-gray-200" />
              <span className="px-3 text-sm text-gray-500">or</span>
              <div className="w-full border-t border-gray-200" />
            </div>
          </>
        )}

        {error && <div className="text-red-500 bg-red-50 p-3 rounded-md text-sm text-center -mt-2">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="School Email" value={form.email} onChange={handleChange} required disabled={!!googleCredential} className={`w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${googleCredential ? 'bg-gray-100' : ''}`} />
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required disabled={!!googleCredential} className={`w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${googleCredential ? 'bg-gray-100' : ''}`} />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required disabled={!!googleCredential} className={`w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${googleCredential ? 'bg-gray-100' : ''}`} />
          
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} max={new Date().toISOString().split("T")[0]} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture (Optional)
            </label>
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePictureFile(e.target.files[0]);
                }
              }}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {profilePictureFile && (
              <img 
                src={URL.createObjectURL(profilePictureFile)} 
                alt="Profile preview" 
                className="mt-4 h-24 w-24 rounded-full object-cover mx-auto" 
              />
            )}
          </div>

          {!googleCredential && (
            <>
              <div className="relative"><input type={showPassword.pass ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" /><span onClick={() => setShowPassword(p => ({ ...p, pass: !p.pass }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500">{showPassword.pass ? <EyeOff size={20} /> : <Eye size={20} />}</span></div>
              <div className="relative"><input type={showPassword.confirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" /><span onClick={() => setShowPassword(p => ({ ...p, confirm: !p.confirm }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500">{showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}</span></div>
            </>
          )}

          <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-2 rounded-lg transition-colors ${isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>{isSubmitting ? "Creating..." : (googleCredential ? "Complete Signup" : "Sign Up")}</button>
        </form>

        <p className="text-sm text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;