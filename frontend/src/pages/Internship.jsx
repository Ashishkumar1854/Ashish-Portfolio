// ✅ InternshipsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const InternshipsPage = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/internships").then((res) => {
    //   setInternships(res.data);
    // });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Internships</h2>
      <div className="grid gap-4">
        {internships.map((item, idx) => (
          <div key={idx} className="p-4 border rounded shadow-md">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">Company: {item.company}</p>
            <p className="text-sm">Duration: {item.duration}</p>
            <a
              href={item.link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Here
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipsPage;
