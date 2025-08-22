import React, { useState } from "react";

const AssistantManager = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.question && form.answer) {
      setData((prev) => [...prev, form]);
      setForm({ question: "", answer: "" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🤖 Manage Assistant Replies</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="User Question"
          className="input-field"
          required
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Assistant Response"
          className="input-field"
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-300"
        >
          Add Response
        </button>
      </form>

      {/* Display */}
      <div className="mt-8 space-y-4">
        {data.map((entry, idx) => (
          <div key={idx} className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold text-gray-800">Q: {entry.question}</p>
            <p className="text-gray-700 mt-1">A: {entry.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistantManager;
