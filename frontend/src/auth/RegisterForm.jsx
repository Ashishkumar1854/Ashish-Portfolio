import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";

const RegisterForm = ({ toggleMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/api/auth/register", formData);
      toast.success(response.data.message || "🎉 Registration successful!");
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Registration failed. Try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
      />
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
        placeholder="Create Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary rounded py-3 mt-2"
      >
        {loading ? "Registering..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
