// =========================================
// FILE: Navbar.jsx
// DESCRIPTION: Navigation bar component for the portfolio website.
// =========================================

import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: NAVBAR
// ==========================================
const Navbar = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? THEME.accent.text
      : `${THEME.accent.textHover}`;
  const navClasses = `${isDarkMode ? THEME.dark.nav : THEME.light.nav} ${
    isDarkMode ? THEME.dark.border : THEME.light.border
  }`;
  const textClasses = isDarkMode ? THEME.dark.text : THEME.light.text;

  return (
    <nav
      className={`sticky top-0 z-40 backdrop-blur-md border-b ${navClasses}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <img src="/origami_bird.svg" alt="Origami Bird" className="w-6 h-6" />
          <span className={textClasses}>Portfolio</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-medium text-sm">
            <Link
              to="/"
              className={`${isActive("/")}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Home Link"
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className={`${isActive("/gallery")}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Gallery Link"
            >
              Gallery
            </Link>
          </div>
          <div className="flex items-center gap-2">
            
            <button
              onClick={toggleTheme}
              className={`cursor-pointer p-2 rounded-full ${
                isDarkMode
                  ? "hover:bg-slate-700 text-yellow-400"
                  : "hover:bg-stone-200 text-stone-600"
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
