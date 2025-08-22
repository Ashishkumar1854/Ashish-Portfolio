// import React, { useEffect, useState } from "react";
// import TeamSection from "../components/TeamSection";
// import BinodAISection from "../components/BinodAISection";
// import ServiceSection from "../components/ServiceSection";
// import ContactSection from "../components/ContactSection";
// import axios from "axios";
// import TeamForm from "../components/admin/TeamForm";
// import ServiceForm from "../components/admin/ServiceForm";

// const About = () => {
//   const [teams, setTeams] = useState([]);
//   const [services, setServices] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = { role: "admin" }; // Dummy user (replace with real auth later)
//   const usage = 2;
//   const limit = 5;

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [teamRes, serviceRes, contactRes] = await Promise.all([
//           axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/team`),
//           axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/services`),
//           axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contacts`),
//         ]);

//         // ✅ Correct way to set data
//         setTeams(teamRes.data?.data || []);
//         setServices(serviceRes.data?.data || []);
//         setContacts(contactRes.data?.data || []);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, []);

//   // ✅ Team Handlers
//   const handleAddTeam = (newMember) => setTeams((prev) => [...prev, newMember]);
//   const handleDeleteTeam = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/team/${id}`);
//       setTeams((prev) => prev.filter((m) => m._id !== id));
//     } catch (err) {
//       console.error("Delete Team Error:", err);
//     }
//   };

//   // ✅ Service Handlers
//   const handleAddService = (newService) =>
//     setServices((prev) => [...prev, newService]);
//   const handleDeleteService = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/services/${id}`
//       );
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Delete Service Error:", err);
//     }
//   };

//   // ✅ Contact Handler (Delete Only, No Add)
//   const handleDeleteContact = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`
//       );
//       setContacts((prev) => prev.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error("Delete Contact Error:", err);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       {/* ✅ BinodAI Section Always at Top */}
//       <BinodAISection user={user} usage={usage} limit={limit} />

//       <h1 className="text-4xl font-bold mb-8 text-center">Meet Our Team 🚀</h1>
//       <p className="mb-6 text-center text-gray-700">
//         Our dedicated team of developers, designers, and innovators working
//         together to deliver exceptional results.
//       </p>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <>
//           {/* ✅ Team Section */}
//           {user?.role === "admin" && <TeamForm onAdd={handleAddTeam} />}
//           <TeamSection teams={teams} onDelete={handleDeleteTeam} user={user} />

//           {/* ✅ Services Section */}
//           <h2 className="text-3xl font-bold my-8 text-center">
//             💼 Our Services
//           </h2>
//           {user?.role === "admin" && <ServiceForm onAdd={handleAddService} />}
//           <ServiceSection
//             services={services}
//             onDelete={handleDeleteService}
//             user={user}
//           />

//           {/* ✅ Contact Section */}
//           <ContactSection
//             contacts={contacts}
//             onDelete={handleDeleteContact}
//             user={user}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default About;

// 16August

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import TeamSection from "../components/TeamSection";
// import ServiceSection from "../components/ServiceSection";
// import ContactSection from "../components/ContactSection";
// import BinodAISection from "../components/BinodAISection";
// import TeamForm from "../components/admin/TeamForm";
// import ServiceForm from "../components/admin/ServiceForm";
// import ContactForm from "../components/admin/ContactForm";

// const About = () => {
//   const [teams, setTeams] = useState([]);
//   const [services, setServices] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Replace with real auth context later
//   const user = { role: "admin" };
//   const usage = 2;
//   const limit = 5;

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/about`
//         );
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
//   }, []);

//   // ----- Handlers -----
//   const handleAddTeam = (newMember) => setTeams((prev) => [...prev, newMember]);
//   const handleDeleteTeam = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/about/team/${id}`
//       );
//       setTeams((prev) => prev.filter((m) => m._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddService = (newService) =>
//     setServices((prev) => [...prev, newService]);
//   const handleDeleteService = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/about/service/${id}`
//       );
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddContact = (newContact) =>
//     setContacts((prev) => [...prev, newContact]);
//   const handleDeleteContact = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/about/contact/${id}`
//       );
//       setContacts((prev) => prev.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       <BinodAISection user={user} usage={usage} limit={limit} />

//       <h1 className="text-4xl font-bold mb-8 text-center">Meet Our Team 🚀</h1>
//       {user?.role === "admin" && <TeamForm onAdd={handleAddTeam} />}
//       <TeamSection teams={teams} onDelete={handleDeleteTeam} user={user} />

//       <h2 className="text-3xl font-bold my-8 text-center">💼 Our Services</h2>
//       {user?.role === "admin" && <ServiceForm onAdd={handleAddService} />}
//       <ServiceSection
//         services={services}
//         onDelete={handleDeleteService}
//         user={user}
//       />

//       <h2 className="text-3xl font-bold my-8 text-center">
//         📞 Contact Information
//       </h2>
//       {user?.role === "admin" && <ContactForm onAdd={handleAddContact} />}
//       <ContactSection
//         contacts={contacts}
//         onDelete={handleDeleteContact}
//         user={user}
//       />
//     </div>
//   );
// };

// export default About;

//21/08

import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamSection from "../components/TeamSection";
import ServiceSection from "../components/ServiceSection";
import ContactSection from "../components/ContactSection";
import TeamForm from "../components/admin/TeamForm";
import ServiceForm from "../components/admin/ServiceForm";
import ContactForm from "../components/admin/ContactForm";
import BinodAISection from "../components/BinodAISection";

const About = () => {
  const [teams, setTeams] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with real auth context
  const user = { role: "admin" };
  const usage = 2;
  const limit = 5;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/about`
        );
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

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <BinodAISection user={user} usage={usage} limit={limit} />

      <h1 className="text-4xl font-bold mb-8 text-center">Meet Our Team 🚀</h1>
      {user?.role === "admin" && (
        <TeamForm
          onAdd={(newMember) => setTeams((prev) => [...prev, newMember])}
        />
      )}
      <TeamSection
        teams={teams}
        onDelete={(id) => setTeams((prev) => prev.filter((m) => m._id !== id))}
        user={user}
      />

      <h2 className="text-3xl font-bold my-8 text-center">💼 Our Services</h2>
      {user?.role === "admin" && (
        <ServiceForm
          onAdd={(newService) => setServices((prev) => [...prev, newService])}
        />
      )}
      <ServiceSection
        services={services}
        onDelete={(id) =>
          setServices((prev) => prev.filter((s) => s._id !== id))
        }
        user={user}
      />

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
        onDelete={(id) =>
          setContacts((prev) => prev.filter((c) => c._id !== id))
        }
        user={user}
      />
    </div>
  );
};

export default About;
