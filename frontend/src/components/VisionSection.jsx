import React from "react";

const VisionSection = () => {
  return (
    <section className="max-w-container mx-auto px-margin-mobile md:px-gutter py-section-gap-md relative">
      <div className="text-center mb-12">
        <h2 className="text-headline-lg font-geist text-on-surface mb-4">
          My Vision: Building Future-Ready<br />Solutions
        </h2>
        <p className="text-body-lg text-text-dim max-w-2xl mx-auto">
          Where Ideas Evolve into Impactful Startups. I strive to create AI-powered, 
          full-stack platforms that redefine industries and empower entrepreneurs worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Card 1 */}
        <div className="glass-card p-8 rounded-xl flex items-start gap-6 hover:border-primary/50 transition-colors">
          <div className="bg-primary-container/20 p-4 rounded-xl text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-3xl">lightbulb</span>
          </div>
          <div>
            <h3 className="text-headline-md text-on-surface mb-2">Passion-Driven Innovation</h3>
            <p className="text-text-dim text-sm leading-relaxed">
              I believe in solving meaningful problems through smart design, scalable technologies, 
              and innovative thinking. Turning code into impactful solutions.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-8 rounded-xl flex items-start gap-6 hover:border-secondary/50 transition-colors">
          <div className="bg-secondary-container/20 p-4 rounded-xl text-secondary flex-shrink-0">
            <span className="material-symbols-outlined text-3xl">public</span>
          </div>
          <div>
            <h3 className="text-headline-md text-on-surface mb-2">Global Impact</h3>
            <p className="text-text-dim text-sm leading-relaxed">
              Delivering solutions that scale globally. Creating platforms that serve both 
              local communities and international audiences with AI-powered technologies.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionSection;
