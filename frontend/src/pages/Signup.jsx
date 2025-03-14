import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const {signup} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup", formData);
      toast.success(response.data.message || "Signup Successfully!");

      if (response.data.token) {
        signup(response.data.token);
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to Signup.");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
