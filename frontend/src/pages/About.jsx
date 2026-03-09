// // frontend/src/pages/About.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import TeamSection from "../components/TeamSection";
// import ServiceSection from "../components/ServiceSection";
// import ContactSection from "../components/ContactSection";
// import TeamForm from "../components/admin/TeamForm";
// import ServiceForm from "../components/admin/ServiceForm";
// import ContactForm from "../components/admin/ContactForm";
// import { useAuth } from "../context/AuthContext";

// const About = () => {
//   const [teams, setTeams] = useState([]);
//   const [services, setServices] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user, token } = useAuth(); // token for auth

//   const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

//   // Fetch About data
//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/about`);
//         setTeams(res.data.teams || []);
//         setServices(res.data.services || []);
//         setContacts(res.data.contacts || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbout();
//   }, [API_BASE]);

//   // Delete handlers
//   const handleDeleteTeam = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/api/about/team/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeams((prev) => prev.filter((m) => m._id !== id));
//     } catch (err) {
//       console.error("Delete team failed:", err);
//     }
//   };

//   const handleDeleteService = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/api/about/service/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Delete service failed:", err);
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/api/about/contact/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setContacts((prev) => prev.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error("Delete contact failed:", err);
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-8 text-center">Meet My Team 🚀</h1>
//       {user?.role === "admin" && (
//         <TeamForm
//           onAdd={(newMember) => setTeams((prev) => [...prev, newMember])}
//         />
//       )}
//       <TeamSection teams={teams} onDelete={handleDeleteTeam} user={user} />

//       <h2 className="text-3xl font-bold my-8 text-center">💼 Our Services</h2>
//       {user?.role === "admin" && (
//         <ServiceForm
//           onAdd={(newService) => setServices((prev) => [...prev, newService])}
//         />
//       )}
//       <ServiceSection
//         services={services}
//         onDelete={handleDeleteService}
//         user={user}
//       />

//       <h2 className="text-3xl font-bold my-8 text-center">
//         📞 Contact Information
//       </h2>
//       {user?.role === "admin" && (
//         <ContactForm
//           onAdd={(newContact) => setContacts((prev) => [...prev, newContact])}
//         />
//       )}
//       <ContactSection
//         contacts={contacts}
//         onDelete={handleDeleteContact}
//         user={user}
//       />
//     </div>
//   );
// };

// export default About;

// frontend/src/pages/About.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api"; // ✅ centralized API import
import TeamSection from "../components/TeamSection";
import ServiceSection from "../components/ServiceSection";
import ContactSection from "../components/ContactSection";
import TeamForm from "../components/admin/TeamForm";
import ServiceForm from "../components/admin/ServiceForm";
import ContactForm from "../components/admin/ContactForm";
import { useAuth } from "../context/AuthContext";

const About = () => {
  const [teams, setTeams] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth(); // token for auth

  // Fetch About data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/api/about");
        setTeams(res.data.teams || []);
        setServices(res.data.services || []);
        setContacts(res.data.contacts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  // Delete handlers
  const handleDeleteTeam = async (id) => {
    try {
      await API.delete(`/api/about/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete team failed:", err);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await API.delete(`/api/about/service/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete service failed:", err);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await API.delete(`/api/about/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete contact failed:", err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Meet My Team </h1>
      {user?.role === "admin" && (
        <TeamForm
          onAdd={(newMember) => setTeams((prev) => [...prev, newMember])}
        />
      )}
      <TeamSection teams={teams} onDelete={handleDeleteTeam} user={user} />

      <div className="my-10 rounded-3xl bg-slate-50/60 p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Services
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            💼 Our Services
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Practical, reliable, and design-first delivery for modern products.
          </p>
        </div>

        {user?.role === "admin" && (
          <div className="mt-6">
            <ServiceForm
              onAdd={(newService) =>
                setServices((prev) => [...prev, newService])
              }
            />
          </div>
        )}

        <div className="mt-6">
          <ServiceSection
            services={services}
            onDelete={handleDeleteService}
            user={user}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold my-8 text-center">
        📞 Contact Information
      </h2>
      {user?.role === "admin" && (
        <ContactForm
          onAdd={(newContact) => setContacts((prev) => [...prev, newContact])}
        />
      )}
      <ContactSection
        contacts={contacts}
        onDelete={handleDeleteContact}
        user={user}
      />
    </div>
  );
};

export default About;
