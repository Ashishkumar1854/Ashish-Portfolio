// 📁 src/auth/AuthModal.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Link } from "react-router-dom"; // ✅ For OTP Login redirect

const AuthModal = ({ show, onClose }) => {
  const [mode, setMode] = useState("login"); // 🔁 Modes: login, register, forgot

  const toggleMode = (newMode) => setMode(newMode);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-[90%] max-w-md text-gray-800 dark:text-white"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            {/* 🔘 Modal Heading Based on Mode */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold capitalize">
                {mode === "login"
                  ? "Login to Your Account"
                  : mode === "register"
                  ? "Create Your Account"
                  : "Forgot Password"}
              </h2>
              <button
                onClick={onClose}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>

            {/* 🔁 Dynamic Forms Section  or switch form */}
            {mode === "login" && (
              <>
                <LoginForm
                  toggleMode={() => toggleMode("register")} // 👈 Switch to signup
                  onForgot={() => toggleMode("forgot")} // 👈 Switch to forgot
                />

                {/* ✅ Login with OTP (separate page via Link) */}
                <div className="text-sm text-center mt-2">
                  <span className="text-gray-600">or </span>
                  <Link
                    to="/otp-login"
                    className="text-blue-500 hover:underline"
                    onClick={onClose} // Close modal on redirect
                  >
                    Login with OTP instead
                  </Link>
                </div>
              </>
            )}

            {mode === "register" && (
              <RegisterForm toggleMode={() => toggleMode("login")} />
            )}

            {mode === "forgot" && (
              <ForgotPasswordForm onBackToLogin={() => toggleMode("login")} />
            )}

            {/* 🔁 Footer Toggle Links */}
            <div className="text-center mt-4">
              {mode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => toggleMode("register")}
                    className="text-blue-500 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : mode === "register" ? (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => toggleMode("login")}
                    className="text-blue-500 hover:underline"
                  >
                    Login
                  </button>
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
