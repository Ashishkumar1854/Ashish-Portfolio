import React, { useState, useEffect } from "react";
import API from "../utils/api";

const AchievementsSection = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/home/pageA");
        setSections(res.data.data?.content || []);
      } catch (err) {
        console.error("Fetch Page A Data Error:", err);
      }
    };
    fetchData();
  }, []);

  const certSection = sections.find(s => s.sectionTitle === "Certifications" || s.sectionTitle?.toLowerCase().includes("cert")) || { items: [] };
  const otherSection = sections.find(s => s !== certSection) || { items: [] };
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
            <h3 className="text-headline-md font-bold text-on-surface">{certSection.sectionTitle || "Certifications"}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {certSection.items.length > 0 ? certSection.items.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-border-subtle hover:border-primary/40 transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="text-on-surface font-semibold mb-2 text-sm">{item.title}</h4>
                  {item.description && <p className="text-text-dim text-xs mb-4">{item.description}</p>}
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-xs w-fit">
                    View Certificate
                  </a>
                )}
              </div>
            )) : (
              <div className="glass-card p-6 rounded-xl border border-border-subtle hover:border-primary/40 transition-colors">
                <h4 className="text-on-surface font-semibold mb-4 text-sm">DSA with Java</h4>
                <button className="btn-ghost !px-4 !py-2 text-xs">View Certificate</button>
              </div>
            )}
          </div>
        </div>

        {/* GitHub Stats */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-secondary">insights</span>
            <h3 className="text-headline-md font-bold text-on-surface">{otherSection.sectionTitle || "GitHub Stats"}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {otherSection.items.length > 0 ? otherSection.items.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-border-subtle hover:border-secondary/40 transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="text-headline-md font-bold text-on-surface mb-1">{item.title}</h4>
                  <p className="text-text-dim text-xs mb-4">{item.description}</p>
                </div>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-xs w-fit">
                    View
                  </a>
                ) : (
                  <button className="btn-ghost !px-4 !py-2 text-xs w-fit">Explore</button>
                )}
              </div>
            )) : (
              <>
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
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AchievementsSection;
