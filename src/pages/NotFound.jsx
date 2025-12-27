// =========================================
// FILE: NotFound.jsx
// DESCRIPTION: 404 Not Found page component for the portfolio website.
// =========================================

import React from "react";
import { Link } from "react-router-dom";
import { Hash } from "lucide-react";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: NOT FOUND (404)
// ==========================================
const NotFound = ({ isDarkMode }) => (
  <div className="text-center py-32">
    
    <h1 className={`text-6xl font-bold mb-4 ${THEME.accent.text}`}>404</h1>
    <p
      className={`text-xl mb-8 ${
        isDarkMode ? "text-slate-400" : "text-stone-600"
      }`}
    >
      Nothing to see here.
    </p>
    <Link
      to="/"
      className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} inline-block`}
    >
      Return Home
    </Link>
  </div>
);

export default NotFound;
