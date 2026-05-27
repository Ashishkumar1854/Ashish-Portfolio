import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Link } from "react-router-dom"; 

const AuthModal = ({ show, onClose }) => {
  const [mode, setMode] = useState("login"); 

  const toggleMode = (newMode) => setMode(newMode);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 backdrop-blur-glass bg-surface-glass flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-card w-full max-w-md p-8 rounded-2xl relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-dim hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="mb-8 text-center">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-2">
                AUTHENTICATION
              </span>
              <h2 className="text-headline-md font-bold text-on-surface">
                {mode === "login"
                  ? "Welcome Back"
                  : mode === "register"
                  ? "Create Account"
                  : "Reset Password"}
              </h2>
            </div>

            {mode === "login" && (
              <>
                <LoginForm
                  toggleMode={() => toggleMode("register")}
                  onForgot={() => toggleMode("forgot")}
                />
                <div className="text-sm text-center mt-6 flex flex-col items-center gap-2">
                  <span className="text-text-dim">or</span>
                  <Link
                    to="/otp-login"
                    className="label-caps text-primary hover:text-on-surface transition-colors"
                    onClick={onClose}
                  >
                    LOGIN WITH OTP
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

            <div className="text-center mt-6 pt-6 border-t border-border-subtle">
              {mode === "login" ? (
                <p className="text-text-dim text-sm">
                  Don't have an account?{" "}
                  <button
                    onClick={() => toggleMode("register")}
                    className="text-primary hover:text-on-surface transition-colors font-medium ml-1"
                  >
                    Sign up
                  </button>
                </p>
              ) : mode === "register" ? (
                <p className="text-text-dim text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => toggleMode("login")}
                    className="text-primary hover:text-on-surface transition-colors font-medium ml-1"
                  >
                    Login
                  </button>
                </p>
              ) : mode === "forgot" ? (
                <p className="text-text-dim text-sm">
                  Remembered your password?{" "}
                  <button
                    onClick={() => toggleMode("login")}
                    className="text-primary hover:text-on-surface transition-colors font-medium ml-1"
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
