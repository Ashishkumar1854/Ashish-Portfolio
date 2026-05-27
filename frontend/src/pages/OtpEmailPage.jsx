import React, { useState } from "react";
import API from "../utils/api"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OtpEmailPage = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const checkIfUserExists = async () => {
    try {
      const res = await API.post("/api/auth/check-user", { email });
      return res.data.exists;
    } catch (err) {
      console.error("❌ User check failed:", err);
      return false;
    }
  };

  const sendOtp = async () => {
    setSending(true);
    try {
      const exists = await checkIfUserExists();

      if (!exists) {
        toast.error("User not found. Please register first.");
        navigate("/register", { state: { email } });
        return;
      }

      await API.post("/api/auth/send-otp", { email });
      toast.success("📩 OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-surface-deep min-h-screen flex justify-center items-center p-4">
      <div className="glass-card p-8 rounded-2xl max-w-sm w-full">
        <div className="mb-8 text-center">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-2">
            SECURE ACCESS
          </span>
          <h2 className="text-headline-md font-bold text-on-surface">Login with OTP</h2>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            disabled={sending}
            className="w-full btn-primary rounded py-3 mt-2"
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpEmailPage;
