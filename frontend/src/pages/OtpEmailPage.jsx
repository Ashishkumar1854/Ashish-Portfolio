// ✅ src/pages/OtpEmailPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OtpEmailPage = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  // ✅ Helper to check if user exists
  const checkIfUserExists = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/check-user",
        {
          email,
        }
      );
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

      await axios.post("http://localhost:5001/api/auth/send-otp", { email });
      toast.success("📩 OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-100 p-4">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full space-y-4">
        <h2 className="text-xl font-bold">Login with OTP</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={sendOtp}
          disabled={sending}
          className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded w-full"
        >
          {sending ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpEmailPage;
