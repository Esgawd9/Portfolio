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
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          user={user}
          isDarkMode={isDarkMode}
          handleEdit={onEdit}
          handleDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
