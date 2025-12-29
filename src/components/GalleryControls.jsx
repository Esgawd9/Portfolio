// ==========================================
// FILE: GalleryControls.jsx
// DESCRIPTION: Gallery controls component for search and view options.
// ==========================================

import React from "react";
import { Search, Grid } from "lucide-react";
import { THEME } from "../config/theme";

const GalleryControls = ({ searchQuery, setSearchQuery, isDarkMode }) => {
  const inputClass = `pl-10 pr-4 py-2 rounded-lg border-2 w-full md:w-64 outline-none ${
    isDarkMode
      ? `${THEME.dark.input} ${THEME.dark.inputBorder} ${THEME.dark.inputText} placeholder-slate-500 focus:border-red-500`
      : `${THEME.light.input} ${THEME.light.inputBorder} ${THEME.light.inputText} placeholder-stone-400 focus:border-red-400`
  }`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
      <div className="flex items-center gap-3">
        <Grid className={`w-6 h-6 ${THEME.accent.text}`} />
        <h1 className="text-3xl font-bold">Gallery</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={inputClass}
            aria-label="Gallery Searchbar"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryControls;
