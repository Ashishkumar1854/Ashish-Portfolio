









import React, { useState } from "react";
import API from "../../utils/api"; // ✅ unified API

const HireModal = ({ hire, onClose }) => {
  const [budget, setBudget] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!budget || !timeToComplete || !contactNumber) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await API.post(
        `/api/admin/hires/${hire._id}/confirm`, // ✅ replaced axios + API_BASE
        { budget, timeToComplete, contactNumber, notes }
      );
      alert("Hire confirmed and email sent to user!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to confirm hire");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Hire Request</h2>
        <p>
          <b>Name:</b> {hire.name}
        </p>
        <p>
          <b>Email:</b> {hire.email}
        </p>
        <p>
          <b>Project:</b> {hire.projectType}
        </p>
        <p>
          <b>Document:</b>{" "}
          <a href={hire.documentUrl} target="_blank" rel="noreferrer">
            View PDF
          </a>
        </p>

        <input
          type="text"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <input
          type="text"
          placeholder="Time to Complete"
          value={timeToComplete}
          onChange={(e) => setTimeToComplete(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <textarea
          placeholder="Additional Notes / Suggestions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 w-full mt-2"
        />

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm Hire"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HireModal;
