import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
      const res = await axios.post(
        `http://localhost:5001/api/auth/reset-password/${token}`,
        { password },
        { withCredentials: true } // ✅ Important if backend sets cookie
      );

      toast.success(res.data.message || "✅ Password reset successful");
      toast.success("✅ Password reset & logged in");

      // ✅ Redirect to dashboard after success
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
    <div className="min-h-screen flex justify-center items-center bg-yellow-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-5">
        <h2 className="text-2xl font-bold text-center">🔐 Reset Password</h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 text-sm rounded text-center">
            {errorMsg}
          </div>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
