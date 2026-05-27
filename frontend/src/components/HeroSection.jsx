import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="max-w-container mx-auto px-margin-mobile md:px-gutter pt-32 pb-section-gap-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Main Text) */}
        <div className="lg:col-span-7">
          <div className="inline-block border border-primary/20 bg-primary/5 rounded-full px-4 py-1.5 label-caps text-primary mb-6">
            Product Engineer • AI/ML Builder
          </div>
          
          <h1 className="text-headline-lg-mobile md:text-headline-xl font-geist text-on-surface mb-6 leading-tight">
            Ashish Kumar builds fast,<br />
            <span className="accent-gradient-text">reliable products</span><br />
            that feel premium.
          </h1>
          
          <p className="text-body-lg text-text-dim mb-8 max-w-xl">
            AI Automation & Full Stack Developer. I build AI chatbots, automation systems, 
            and scalable web apps that help startups save time and grow faster.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 border border-border-subtle bg-surface-elevated rounded-full px-4 py-2 label-caps text-[11px] text-text-dim">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              React / Node / MongoDB
            </div>
            <div className="flex items-center gap-2 border border-border-subtle bg-surface-elevated rounded-full px-4 py-2 label-caps text-[11px] text-text-dim">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Python / AI/ML / APIs
            </div>
          </div>
        </div>

        {/* Right Column (Bento Cards) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1 */}
          <div className="glass-card p-6 rounded-xl border-t-[3px] border-t-primary/50 hover:-translate-y-1 transition-transform">
            <p className="label-caps text-text-dim mb-3">RECENT FOCUS</p>
            <h3 className="text-headline-md text-on-surface mb-3">Admin dashboard + GPT assistant + hire workflow</h3>
            <p className="text-sm text-text-dim leading-relaxed">
              Built end-to-end UX with secure auth, analytics, and email automation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 rounded-xl border-t-[3px] border-t-secondary/50 hover:-translate-y-1 transition-transform">
            <p className="label-caps text-text-dim mb-3">OPEN TO</p>
            <h3 className="text-headline-md text-on-surface mb-3">Freelance, product roles, and collaborations</h3>
            <p className="text-sm text-text-dim leading-relaxed">
              I love shipping fast, clear builds with strong UX.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
