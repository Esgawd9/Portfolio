// =========================================
// FILE: Footer.jsx
// DESCRIPTION: Footer component for the portfolio website.
// =========================================

import React from "react";
import { LogOut, Mail, Lock } from "lucide-react";
import { THEME } from "../config/theme";

import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Palette, ExternalLink } from "lucide-react";

// ==========================================
// COMPONENT: FOOTER
// ==========================================
const Footer = ({ isDarkMode, user, setShowLoginModal }) => {
  const year = new Date().getFullYear();
  const textClass = isDarkMode ? "text-slate-500" : "text-stone-500";
  const footerClass = isDarkMode ? THEME.dark.footer : THEME.light.footer;

  return (
    <footer className={`py-10 text-center border-t mt-20 ${footerClass}`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className={textClass}>© {year} Zsombor Pintér</p>
          <Link
            to="/privacy"
            className={`${textClass} opacity-60 hover:text-red-500 transition-colors underline`}
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex gap-3 md:gap-8 text-sm font-medium">
          <a
            href="https://github.com/Esgawd9"
            target="_blank"
            rel="noreferrer"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
            aria-label="GitHub Link"
          >
            GitHub
            <ExternalLink size={10} />
          </a>
          <a
            href="https://www.linkedin.com/in/zsombor-pinter"
            target="_blank"
            rel="noreferrer"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
            aria-label="LinkedIn Link"
          >
            LinkedIn
            <ExternalLink size={10} />
          </a>
          <a
            href="mailto:zsombor.pinter0105@gmail.com"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
            aria-label="Email Link"
          >
            <Mail size={14} className="hidden md:block" /> Email
          </a>
          <Link
            to="/gallery"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
          >
            <Palette size={14} className="hidden md:block" />
            Gallery
          </Link>
          {user ? (
            <button
              onClick={() => signOut(auth)}
              className={`${THEME.accent.text} text-sm font-bold flex items-center gap-1 mr-2`}
              aria-label="Admin Logout"
            >
              <LogOut size={16} />
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className={`opacity-20 hover:opacity-100 transition-opacity mr-2 `}
              aria-label="Admin Login"
            >
              <Lock size={16} />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
