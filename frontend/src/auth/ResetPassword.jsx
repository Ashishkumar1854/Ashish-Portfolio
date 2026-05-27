import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async () => {
    if (password.length < 6) {
      toast.error("⚠️ Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/api/auth/reset-password/${token}`, {
        password,
      });

      toast.success(res.data.message || "✅ Password reset successful");
      toast.success("✅ Password reset & logged in");

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message || "❌ Reset failed. Try again later.";
      toast.error(msg);
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-deep min-h-screen flex justify-center items-center p-4">
      <div className="glass-card p-8 rounded-2xl w-full max-w-md space-y-5">
        <div className="text-center mb-6">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">lock_reset</span>
          <h2 className="text-2xl font-bold text-on-surface">Reset Password</h2>
        </div>

        {errorMsg && (
          <div className="bg-error/10 border border-error/50 text-error p-3 text-sm rounded text-center label-caps">
            {errorMsg}
          </div>
        )}

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full btn-primary rounded py-3 mt-4"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
