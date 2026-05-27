











import React, { useState, useEffect } from "react";
import TimelineEditor from "../../components/admin/TimelineEditor";
import API from "../../utils/api"; // centralized API

const JourneyManager = () => {
  const [timeline, setTimeline] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  const fetchTimeline = async () => {
    try {
      const res = await API.get("/api/journey");
      setTimeline(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch journey timeline:", err.message);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const handleAddTimeline = async (entry) => {
    try {
      const res = await API.post("/api/journey", entry);
      setTimeline([...timeline, res.data]);
    } catch (err) {
      console.error("❌ Failed to add timeline entry:", err.message);
    }
  };

  const handleUpdate = async (id, updatedEntry) => {
    try {
      const res = await API.put(`/api/journey/${id}`, updatedEntry);
      setTimeline(timeline.map((item) => (item._id === id ? res.data : item)));
      setEditingEntry(null);
    } catch (err) {
      console.error("❌ Failed to update timeline entry:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await API.delete(`/api/journey/${id}`);
      setTimeline(timeline.filter((item) => item._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete timeline entry:", err.message);
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl max-w-4xl mx-auto mb-12 text-on-surface">
      <h2 className="text-2xl font-bold mb-4 text-primary">📅 Manage Journey Timeline</h2>

      <TimelineEditor
        onSubmit={
          editingEntry
            ? (data) => handleUpdate(editingEntry._id, data)
            : handleAddTimeline
        }
        editingEntry={editingEntry}
        cancelEdit={() => setEditingEntry(null)}
      />

      <div className="mt-8 space-y-4">
        {timeline.map((item) => (
          <div
            key={item._id}
            className="p-6 bg-surface-elevated border border-border-subtle rounded-xl hover:border-primary transition-colors"
          >
            <p className="text-sm text-tertiary font-mono label-caps mb-2">📅 {item.year}</p>
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              {item.title}
            </h3>
            <p className="text-text-dim">{item.description}</p>

            <div className="mt-4 flex space-x-3 pt-4 border-t border-border-subtle">
              <button
                className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-3 py-1 rounded hover:bg-tertiary/20 text-sm font-medium transition-colors"
                onClick={() => setEditingEntry(item)}
              >
                Edit
              </button>
              <button
                className="bg-error/10 text-error border border-error/20 px-3 py-1 rounded hover:bg-error/20 text-sm font-medium transition-colors"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyManager;
