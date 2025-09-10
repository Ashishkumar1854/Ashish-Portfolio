import React, { useState, useEffect } from "react";

const TimelineEditor = ({ onSubmit, editingEntry, cancelEdit }) => {
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Prefill form when editing
  useEffect(() => {
    if (editingEntry) {
      setYear(editingEntry.year);
      setTitle(editingEntry.title);
      setDescription(editingEntry.description);
    } else {
      setYear("");
      setTitle("");
      setDescription("");
    }
  }, [editingEntry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !title || !description) return;
    onSubmit({ year, title, description });
    if (!editingEntry) {
      setYear("");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border border-gray-300 rounded shadow bg-white"
    >
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded mt-4 w-full"
      />
      <div className="mt-4 flex space-x-2">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            editingEntry
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editingEntry ? "Update Timeline" : "Add Timeline"}
        </button>
        {editingEntry && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TimelineEditor;
