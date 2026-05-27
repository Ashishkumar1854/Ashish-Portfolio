import React, { useState } from "react";
import API from "../utils/api";
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
      const res = await API.post(
        "/api/auth/verify-otp",
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
    <div className="bg-surface-deep min-h-screen flex justify-center items-center p-4">
      <div className="glass-card p-8 rounded-2xl max-w-sm w-full">
        <div className="mb-8 text-center">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-2">
            VERIFICATION
          </span>
          <h2 className="text-headline-md font-bold text-on-surface">Enter OTP</h2>
          <p className="text-sm text-text-dim mt-2">Sent to: {email}</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="6-digit OTP"
            maxLength={6}
            className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors tracking-[0.5em] text-center font-mono text-xl"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="w-full btn-primary rounded py-3 mt-2"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
