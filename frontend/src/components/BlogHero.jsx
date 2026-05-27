import React from "react";

const BlogHero = ({ onSearch }) => {
  return (
    <section className="mb-section-gap-md max-w-[1280px] mx-auto px-margin-mobile md:px-gutter pt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-stack-md">
        <div className="max-w-2xl w-full">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4">
            ENGINEERING INSIGHTS
          </span>
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-6">The Debug Log</h1>
          <p className="font-body-lg text-body-lg text-text-dim mb-8">
            Exploring the intersection of scalable architecture, artificial intelligence, and the future of product engineering.
          </p>
          <input
            type="text"
            placeholder="Search blogs..."
            className="px-6 py-3 bg-surface-deep border border-border-subtle focus:border-primary text-on-surface outline-none w-full max-w-md transition-all font-label-caps"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="hidden md:flex space-x-2 pb-2">
          <div className="h-[1px] w-12 bg-primary self-center"></div>
          <span className="font-label-caps text-label-caps text-text-dim">LATENCY: 12MS</span>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
