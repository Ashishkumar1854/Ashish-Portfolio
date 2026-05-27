import React from "react";
import { Link } from "react-router-dom";

const ProcessSection = () => {
  return (
    <section className="max-w-container mx-auto px-margin-mobile md:px-gutter py-section-gap-md relative">
      <div className="glass-card border border-border-subtle rounded-2xl overflow-hidden relative min-h-[500px] flex items-center justify-center p-8">
        
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-surface-deep via-surface-deep/80 to-transparent"></div>
        <div className="absolute inset-0 z-0 bg-surface-deep/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <p className="label-caps text-text-dim mb-4 tracking-[0.2em]">THE PROCESS</p>
          <h2 className="text-headline-lg-mobile md:text-headline-xl font-geist text-on-surface mb-6 leading-tight">
            From Concept to Execution — a<br />Transparent Build Journey
          </h2>
          <p className="text-body-md text-text-dim max-w-2xl mx-auto mb-10 leading-relaxed">
            A behind-the-scenes look into how I take raw ideas, break them down, validate 
            assumptions, and turn them into working product features. I share prototypes, failures, 
            iterations, and decisions — exactly how real startup product teams work.
          </p>
          <Link to="/journey" className="btn-primary flex items-center gap-2 px-8">
            View Full Journey
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default ProcessSection;
