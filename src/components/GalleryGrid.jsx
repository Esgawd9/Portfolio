// ==========================================
// FILE: GalleryGrid.jsx
// DESCRIPTION: Gallery grid component for displaying origami models.
// ==========================================

import React from "react";
import GalleryCard from "./GalleryCard.jsx";
import { THEME } from "../config/theme";

const GalleryGrid = ({
  items,
  loading,
  user,
  isDarkMode,
  onEdit,
  onDelete,
}) => {
  // Theme Shortcuts
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const textMain = isDarkMode ? THEME.dark.text : THEME.light.text;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className={`h-90 rounded-xl ${
              isDarkMode ? "bg-slate-800" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          user={user}
          isDarkMode={isDarkMode}
          handleEdit={onEdit}
          handleDelete={onDelete}
          cardBg={cardBg}
          border={border}
          textMain={textMain}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
