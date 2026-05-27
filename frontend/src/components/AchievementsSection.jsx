import React from "react";

const AchievementsSection = () => {
  return (
    <section className="max-w-container mx-auto px-margin-mobile md:px-gutter py-section-gap-md relative">
      <div className="text-center mb-12">
        <div className="inline-flex justify-center items-center text-secondary mb-4">
          <span className="material-symbols-outlined text-3xl">emoji_events</span>
        </div>
        <h2 className="text-headline-lg font-geist text-on-surface mb-4">
          Showcasing My Achievements & Credentials
        </h2>
        <p className="text-body-lg text-text-dim max-w-2xl mx-auto">
          A journey through certifications, skills, and awards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Certifications */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">verified</span>
            <h3 className="text-headline-md font-bold text-on-surface">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-xl border border-border-subtle hover:border-primary/40 transition-colors">
              <h4 className="text-on-surface font-semibold mb-4 text-sm">DSA with Java</h4>
              <button className="btn-ghost !px-4 !py-2 text-xs">View Certificate</button>
            </div>
            <div className="glass-card p-6 rounded-xl border border-border-subtle hover:border-primary/40 transition-colors">
              <h4 className="text-on-surface font-semibold mb-4 text-sm">Data Science AI/ML</h4>
              <button className="btn-ghost !px-4 !py-2 text-xs">View Certificate</button>
            </div>
          </div>
        </div>

        {/* GitHub Stats */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-secondary">insights</span>
            <h3 className="text-headline-md font-bold text-on-surface">GitHub Stats</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-xl border border-border-subtle hover:border-secondary/40 transition-colors">
              <h4 className="text-headline-md font-bold text-on-surface mb-1">186+</h4>
              <p className="text-text-dim text-xs mb-4">Contributions in 2023</p>
              <button className="btn-ghost !px-4 !py-2 text-xs">View Profile</button>
            </div>
            <div className="glass-card p-6 rounded-xl border border-border-subtle hover:border-secondary/40 transition-colors">
              <h4 className="text-headline-md font-bold text-on-surface mb-1">17+</h4>
              <p className="text-text-dim text-xs mb-4">Repositories</p>
              <button className="btn-ghost !px-4 !py-2 text-xs">Explore Code</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AchievementsSection;
