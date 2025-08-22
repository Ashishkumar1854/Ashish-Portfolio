import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamForm from "../../components/admin/TeamForm";

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/api/team");
      setTeamMembers(res.data);
    } catch (err) {
      console.error("Error fetching team members", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (member) => {
    try {
      const res = await axios.post("/api/team", member);
      setTeamMembers([res.data, ...teamMembers]);
    } catch (err) {
      console.error("Error adding team member", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        👥 Manage Team Members
      </h2>

      {/* Add Form */}
      <TeamForm onAdd={handleAddMember} />

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{member.role}</p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm mt-2 inline-block hover:underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
