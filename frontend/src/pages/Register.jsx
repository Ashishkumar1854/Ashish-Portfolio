import React from "react";
import RegisterForm from "../auth/RegisterForm";

const Register = () => {
  // Optional: switch to login if you want to navigate between routes
  const switchToLogin = () => {
    window.location.href = "/login"; // or use navigate("/login") with React Router
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-500 p-4">
      {/* ✅ RegisterForm handles registration logic & toast */}
      <RegisterForm onSwitch={switchToLogin} />
    </div>
  );
};

export default Register;
