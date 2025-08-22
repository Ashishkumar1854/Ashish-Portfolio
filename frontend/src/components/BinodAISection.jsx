import React from "react";

const BinodAISection = ({ user, usage, limit }) => {
  const remaining = limit - usage;
  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-blue-100 rounded-xl p-6 mt-10 shadow">
      <h2 className="text-xl font-bold mb-4">
        BinodAI - Frontend Generator 🤖
      </h2>

      {/* Info Section */}
      {isAdmin ? (
        <p className="mb-4">
          You are an <strong>Admin</strong> and have full access to BinodAI.
          Build unlimited frontend components with AI assistance.
        </p>
      ) : (
        <p className="mb-4">
          You are a <strong>Team Member</strong>. You can view BinodAI here, but
          only Admin can use it to build components.
          <br />
          You have <strong>{remaining}</strong> component views remaining.
          <br />
          Need more access? Consider upgrading your plan.
        </p>
      )}

      {/* Progress Bar */}
      {!isAdmin && (
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${(usage / limit) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Action Button */}
      <button
        className={`px-4 py-2 rounded font-semibold transition ${
          isAdmin
            ? "bg-yellow-400 hover:bg-yellow-500"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isAdmin}
      >
        {isAdmin ? "Launch BinodAI" : "Admin Access Only"}
      </button>

      {/* Upgrade Plan Button (For Users) */}
      {!isAdmin && (
        <button className="mt-3 bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500">
          Upgrade Plan
        </button>
      )}
    </div>
  );
};

export default BinodAISection;
