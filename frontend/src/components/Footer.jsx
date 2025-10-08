// frontend/src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Logo & About */}
        <div className="flex flex-col items-start md:items-start">
          <Link to="/">
            <img
              src="/logo.jpeg"
              alt="Ashish Bhai Logo"
              className="w-20 h-20 mb-2 rounded-full border-2 border-gray-500 hover:border-indigo-400 transition-all"
            />
          </Link>
          <p className="text-gray-300 text-sm max-w-xs">
            Hi! I’m <strong>Ashish Kumar</strong>, an{" "}
            <span className="text-indigo-400 font-medium">
              innovative developer
            </span>
            ,{" "}
            <span className="text-green-400 font-medium">curious learner</span>,
            and{" "}
            <span className="text-pink-400 font-medium">AI/ML enthusiast</span>{" "}
            crafting creative web solutions.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col">
          <h2 className="text-white font-semibold mb-1 text-sm">Contact</h2>
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:ashish@example.com" className="hover:text-white">
              stonebytetech@gmail.com
            </a>
          </p>
          <p className="text-sm mt-1">
            Phone:{" "}
            <a href="tel:+919693263085" className="hover:text-white">
              +91 96932 63085
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col">
          <h2 className="text-white font-semibold mb-1 text-sm">Follow Me</h2>
          <div className="flex gap-4 text-2xl mt-1">
            <a
              href="https://www.instagram.com/mwbyashish/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/ashishkumar1854/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-transform transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/Ashishkumar1854"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-xs">
        © 2025 StoneByte. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
