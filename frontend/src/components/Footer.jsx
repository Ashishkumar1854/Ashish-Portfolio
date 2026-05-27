import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-deep border-t border-border-subtle py-16">
      <div className="section-container flex flex-col md:flex-row justify-between items-center gap-6">
        
        {}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link to="/" className="label-caps font-bold text-on-surface hover:text-primary transition-colors">
            ASHISH KUMAR
          </Link>
          <p className="text-text-dim label-caps text-[10px]">
            © 2025 Ashish Kumar • Built with Precision
          </p>
        </div>

        {}
        <div className="flex flex-wrap justify-center md:justify-end gap-6">
          <a
            href="https://github.com/Ashishkumar1854"
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps text-text-dim hover:text-on-surface transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/ashishkumar1854/"
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps text-text-dim hover:text-on-surface transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:stonebytetech@gmail.com"
            className="label-caps text-text-dim hover:text-on-surface transition-colors"
          >
            EMAIL
          </a>
          <a
            href="https://www.instagram.com/mwbyashish/"
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps text-text-dim hover:text-on-surface transition-colors"
          >
            TWITTER
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
