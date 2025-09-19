import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  // Agar user kisi protected route se aya tha to wahi redirect ho
  const from = location.state?.from?.pathname || "/";
 const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setAuth(res.data.user);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
 const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center px-6 py-12">
        <div className="flex flex-col items-center mb-8">
          <img src="/crm.png" alt="SalesTruff Logo" className="w-22 h-20 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">SalesTruff</h1>
        </div>

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-sm text-red-500 text-center mb-4">
            To access this page, you must log in to SalesTruff.
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              handleLogin();      
            }}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center mt-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Remember me</span>
          </div>

          <button
            onClick={handleForgotPassword}
            className="w-full mt-4 text-sm text-blue-500 hover:underline"
          >
            Forgot Your Password?
          </button>
        </div>


        <p className="text-xs text-gray-500 mt-6">
          © 2025 SalesTruff. All rights reserved.
        </p>
      </div>

      {/* Right side marketing */}
      <div className="hidden md:flex flex-col w-1/2 items-center justify-center bg-white px-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-snug">
          Start your free trial. <br />
          No credit card required, no software to install.
        </h2>

        <ul className="space-y-3 text-gray-700 text-lg mb-8">
          <li>✔ Preloaded data or upload your own</li>
          <li>✔ Preconfigured processes, reports, and dashboards</li>
          <li>✔ Guided experiences for sales reps, leaders, and admins</li>
          <li>✔ Online training and live onboarding webinars</li>
        </ul>

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Start my free trial
        </button>

        {/* Placeholder for product screenshot */}
        <div className="mt-10">
          <img
            src="/crm.png"
            alt="CRM Preview"
            className="w-72 rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
