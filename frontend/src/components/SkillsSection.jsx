import React from "react";

const SkillsSection = () => {
  return (
    <section className="max-w-container mx-auto px-margin-mobile md:px-gutter py-section-gap-md relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <p className="label-caps text-primary mb-2">THE STACK</p>
          <h2 className="text-headline-lg font-geist text-on-surface">My Skills - Built for Production</h2>
        </div>
        <p className="text-body-md text-text-dim max-w-sm mt-4 md:mt-0 text-left md:text-right">
          I design and ship scalable web products used by real users. 
          From architecture and front-end UX to backend services and deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Frontend Card */}
        <div className="glass-card p-6 rounded-xl border-t-[3px] border-t-primary/50 hover:border-primary/50 transition-colors flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md font-bold text-on-surface">Frontend</h3>
            <span className="text-xs font-mono font-bold text-primary/60">5 TOOLS</span>
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center border-b border-primary pb-2">
              <span className="text-sm font-semibold text-on-surface">React.js</span>
              <span className="label-caps text-secondary text-[10px]">PROFICIENT</span>
            </div>
            <div className="flex justify-between items-center border-b border-primary pb-2">
              <span className="text-sm font-semibold text-on-surface">Tailwind CSS</span>
              <span className="label-caps text-secondary text-[10px]">PROFICIENT</span>
            </div>
          </div>
        </div>

        {/* Backend Card */}
        <div className="glass-card p-6 rounded-xl border-t-[3px] border-t-secondary/50 hover:border-secondary/50 transition-colors flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md font-bold text-on-surface">Backend</h3>
            <span className="text-xs font-mono font-bold text-secondary/60">6 TOOLS</span>
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center border-b border-secondary pb-2">
              <span className="text-sm font-semibold text-on-surface">Node.js</span>
              <span className="label-caps text-secondary text-[10px]">PROFICIENT</span>
            </div>
            <div className="flex justify-between items-center border-b border-secondary pb-2">
              <span className="text-sm font-semibold text-on-surface">Python / Django</span>
              <span className="label-caps text-secondary text-[10px]">PROFICIENT</span>
            </div>
          </div>
        </div>

        {/* Data Science Card */}
        <div className="glass-card p-6 rounded-xl border-t-[3px] border-t-tertiary/50 hover:border-tertiary/50 transition-colors flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md font-bold text-on-surface">Data Science</h3>
            <span className="text-xs font-mono font-bold text-tertiary/60">7 TOOLS</span>
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center border-b border-tertiary pb-2">
              <span className="text-sm font-semibold text-on-surface">LLMs + RAG</span>
              <span className="label-caps text-tertiary text-[10px]">PROFICIENT</span>
            </div>
            <div className="flex justify-between items-center border-b border-tertiary pb-2">
              <span className="text-sm font-semibold text-on-surface">Computer Vision</span>
              <span className="label-caps text-tertiary text-[10px]">PROFICIENT</span>
            </div>
          </div>
        </div>

        {/* Core Concept Card */}
        <div className="glass-card p-6 rounded-xl border-t-[3px] border-t-white/30 hover:border-white/50 transition-colors flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md font-bold text-on-surface">Core Concept</h3>
            <span className="text-xs font-mono font-bold text-text-dim">5 TOOLS</span>
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <span className="text-sm font-semibold text-on-surface">DSA</span>
              <span className="label-caps text-secondary text-[10px]">PROFICIENT</span>
            </div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <span className="text-sm font-semibold text-on-surface">System Design</span>
              <span className="label-caps text-secondary text-[10px]">PROFICIENT</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
