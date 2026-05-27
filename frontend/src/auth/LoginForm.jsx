import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onForgot }) => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
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
        className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
      />
      <input
        type="password"
        name="password"
        placeholder="Your Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
      />
      <div className="text-right text-sm">
        <button
          type="button"
          onClick={onForgot}
          className="text-text-dim hover:text-primary transition-colors text-sm"
        >
          Forgot password?
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary rounded py-3 mt-2"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
