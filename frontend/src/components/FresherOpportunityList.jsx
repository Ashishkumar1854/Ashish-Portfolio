








import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/api"; // ✅ centralized axios instance

const FresherOpportunityList = ({ adminView = false, fetchOpportunities }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    role: "",
    company: "",
    stipend: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/fresher-opportunities");
        setOpportunities(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [fetchOpportunities]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/fresher-opportunities/${id}`);
      fetchOpportunities?.(); // optional refresh trigger
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/fresher-opportunities", newOpportunity);
      setNewOpportunity({
        role: "",
        company: "",
        stipend: "",
        description: "",
        link: "",
      });
      fetchOpportunities?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {}
      {adminView && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-4 border rounded-lg bg-gray-50 shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Add New Opportunity</h3>
          <input
            type="text"
            placeholder="Role"
            value={newOpportunity.role}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, role: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={newOpportunity.company}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, company: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Stipend"
            value={newOpportunity.stipend}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, stipend: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={newOpportunity.description}
            onChange={(e) =>
              setNewOpportunity({
                ...newOpportunity,
                description: e.target.value,
              })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Link"
            value={newOpportunity.link}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, link: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Opportunity
          </button>
        </form>
      )}

      {}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((op) => (
          <motion.div
            key={op._id}
            className="bg-white p-4 rounded-lg shadow-lg border hover:border-yellow-400 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {op.role}
            </h3>
            <p className="text-gray-600 mb-1">
              <strong>Company:</strong> {op.company}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Stipend:</strong> {op.stipend || "Not disclosed"}
            </p>
            <p className="text-gray-500 mb-2 text-sm">{op.description}</p>
            <a
              href={op.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Apply / View Details
            </a>

            {adminView && (
              <button
                onClick={() => handleDelete(op._id)}
                className="mt-2 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FresherOpportunityList;
