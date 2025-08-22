// src/auth/RegisterForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData,
        { withCredentials: true }
      );

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
        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800"
      />
      <input
        type="password"
        name="password"
        placeholder="Create Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
      >
        {loading ? "Registering..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
