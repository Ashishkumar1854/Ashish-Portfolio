import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onForgot }) => {
  const { login, user } = useAuth();
  console.log("👤 useAuth user:", user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/"); // ✅ Redirect when user is set
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      toast.success("🎉 Login successful!");
      // Don't need navigate("/") here anymore, handled by useEffect
    } catch (err) {
      const message =
        err.response?.data?.message || "❌ Login failed. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
      />
      <input
        type="password"
        name="password"
        placeholder="Your Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
      />
      <div className="text-right text-sm">
        <button
          type="button"
          onClick={onForgot}
          className="text-blue-500 hover:underline text-sm"
        >
          Forgot password?
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-md"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
