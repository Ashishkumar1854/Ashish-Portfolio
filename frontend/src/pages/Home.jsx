// // src/pages/Home.jsx
// import React from "react";
// import HeroSection from "../components/HeroSection";
// import SkillsSection from "../components/SkillsSection";
// import VisionSection from "../components/VisionSection";
// import PageASection from "../components/PageASection";
// import PageBSection from "../components/PageBSection";

// const Home = ({ user }) => {
//   return (
//     <div className="space-y-20">
//       {/* ✅ Hero Section (Dynamic Recent Posts with Admin Controls) */}
//       <HeroSection user={user} />

//       {/* ✅ Skills Section (Dynamic, DB-powered, Admin Editable) */}
//       <SkillsSection user={user} />

//       {/* ✅ Vision Section (Static or DB-driven if you prefer later) */}
//       <VisionSection />

//       {/* ✅ Page A Section (Static or DB-powered later) */}
//       <PageASection />

//       {/* ✅ Page B Section (Static or DB-powered later) */}
//       <PageBSection />
//     </div>
//   );
// };

// export default Home;

// ✅ src/pages/Home.jsx

import React from "react";
import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";
import VisionSection from "../components/VisionSection";
import PageASection from "../components/PageASection";
import PageBSection from "../components/PageBSection";
import PageCSection from "../components/PageCSection";

const Home = ({ user }) => {
  return (
    <div className="space-y-20">
      {/* ✅ Hero Section (Title, Description, CTA + Recent Posts inside it) */}
      <HeroSection user={user} />

      {/* ✅ Skills Section (Dynamic, DB-powered, Admin Editable) */}
      <SkillsSection user={user} />

      {/* ✅ Vision Section (Static or DB-driven if preferred) */}
      <VisionSection />

      {/* ✅ Page A Section (Role-based logic for Admin: add/delete) */}
      <PageASection user={user} />

      {/* ✅ Page B Section (Same logic as PageASection, no `sections[]` array) */}
      <PageBSection user={user} />

      {/* ✅ Page C Section (Same logic as PageASection, no `sections[]` array) */}
      <PageCSection user={user} />
    </div>
  );
};

export default Home;
