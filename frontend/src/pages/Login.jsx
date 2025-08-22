// ✅ src/pages/Login.jsx
import React from "react";
import LoginForm from "../auth/LoginForm";

const Login = () => {
  const switchToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-400 p-4">
      <LoginForm onForgot={() => alert("Forgot clicked")} />
    </div>
  );
};

export default Login;
