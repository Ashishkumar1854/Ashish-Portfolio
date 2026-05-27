import React from "react";
import HeroSection from "../components/HeroSection";
import VisionSection from "../components/VisionSection";
import SkillsSection from "../components/SkillsSection";
import AchievementsSection from "../components/AchievementsSection";
import ProcessSection from "../components/ProcessSection";

const Home = ({ user }) => {
  return (
    <div className="space-y-4 pb-20">
      <HeroSection user={user} />
      <VisionSection />
      <SkillsSection />
      <AchievementsSection />
      <ProcessSection />
    </div>
  );
};

export default Home;
