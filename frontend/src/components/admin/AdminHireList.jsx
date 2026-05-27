import React, { useEffect, useState } from "react";
import HireModal from "./HireModal";
import API from "../../utils/api"; 

const AdminHireList = () => {
  const [hires, setHires] = useState([]);
  const [selectedHire, setSelectedHire] = useState(null);

  const fetchHires = async () => {
    try {
      const res = await API.get("/api/admin/hires");
      setHires(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHires();
  }, []);

  return (
    <div>
      {hires.length === 0 && <p className="text-text-dim label-caps">No pending hires.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hires.map((hire) => (
          <div
            key={hire._id}
            className="p-6 bg-surface-elevated border border-border-subtle rounded-xl cursor-pointer hover:border-primary transition-colors"
            onClick={() => setSelectedHire(hire)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-headline-md font-bold text-on-surface">{hire.name}</h3>
              <span className={`label-caps px-2 py-1 rounded border ${hire.status === "pending" ? "text-tertiary border-tertiary" : "text-primary border-primary"}`}>
                {hire.status}
              </span>
            </div>
            <p className="text-body-sm text-text-dim mb-1"><span className="text-on-surface font-medium">Email:</span> {hire.email}</p>
            <p className="text-body-sm text-text-dim"><span className="text-on-surface font-medium">Project:</span> {hire.projectType}</p>
          </div>
        ))}
      </div>

      {selectedHire && (
        <HireModal
          hire={selectedHire}
          onClose={() => {
            setSelectedHire(null);
            fetchHires();
          }}
        />
      )}
    </div>
  );
};

export default AdminHireList;
