// =========================================
// FILE: GalleryCard.jsx
// DESCRIPTION: Card component for displaying individual gallery items.
// =========================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { THEME } from "../config/theme";

const GalleryCard = ({ item, user, isDarkMode, handleEdit, handleDelete, index }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isPriority = index < 6;

  return (
    <Link
      to={`/gallery/${item.id}`}
      className="group relative block w-full aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl"
    >
      {/* --- ADMIN CONTROLS (Top Right) --- */}
      {user && (
        <div className="absolute top-3 right-3 z-30 flex gap-2 lg:opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEdit(item);
            }}
            className="bg-white/90 text-slate-800 p-2 rounded-full hover:bg-blue-500 hover:text-white shadow-lg backdrop-blur-sm transition-colors"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(item.id, e)}
            className="bg-white/90 text-slate-800 p-2 rounded-full hover:bg-red-500 hover:text-white shadow-lg backdrop-blur-sm transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* --- IMAGE CONTAINER --- */}
      <div
        className={`w-full h-full relative ${
          isDarkMode ? "bg-slate-800" : "bg-gray-200"
        }`}
      >
        {/* Loading Spinner */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        )}

        <img
          src={item.image}
          alt={
            item.title + " origami model origami model folded by Zsombor Pintér"
          }
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* --- GRADIENT OVERLAY --- */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />

        {/* --- CONTENT --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          {/* Badge */}
          <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold text-white bg-black/20 backdrop-blur-md rounded">
            {item.difficulty}
          </span>

          {/* Title */}
          <h2 className="text-xl font-bold text-amber-50 leading-tight drop-shadow-md">
            {item.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
