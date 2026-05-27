import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReset = async () => {
    setLoading(true);
    try {
      await API.post("/api/auth/forgot-password", { email });
      toast.success("🔑 Reset password link sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Your email address"
        className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={sendReset}
        disabled={loading}
        className="w-full btn-primary rounded py-3 mt-2"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
