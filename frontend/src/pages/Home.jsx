
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
      {}
      <HeroSection user={user} />

      {}
      <SkillsSection user={user} />

      {}
      <VisionSection />

      {}
      <PageASection user={user} />

      {}
      <PageBSection user={user} />

      {}
      <PageCSection user={user} />
    </div>
  );
};

export default Home;
