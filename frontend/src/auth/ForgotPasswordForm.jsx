// src/auth/ForgotPasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const sendReset = async () => {
    try {
      await axios.post("http://localhost:5001/api/auth/forgot-password", {
        email,
      });
      toast.success("🔑 Reset password link sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send link");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Your email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={sendReset}
        className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded w-full"
      >
        Send Reset Link
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
