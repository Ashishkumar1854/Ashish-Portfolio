// src/pages/VerifyOtpPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const VerifyOtpPage = () => {
  const { setUser } = useAuth();
  const { state } = useLocation();
  const email = state?.email || "";
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      toast.success("✅ Login successful via OTP");
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-100 p-4">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full space-y-4">
        <h2 className="text-xl font-bold">Enter OTP</h2>
        <p className="text-sm text-gray-600">Sent to: {email}</p>
        <input
          type="text"
          placeholder="6-digit OTP"
          maxLength={6}
          className="w-full border p-2 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={verifyOtp}
          className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded w-full"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
