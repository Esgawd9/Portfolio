// ==========================================
// FILE: Gallery.jsx
// DESCRIPTION: Gallery page for displaying origami models with search and admin features.
// ==========================================

import React, { useState } from "react";
import SEO from "../components/SEO";
import { useOrigami } from "../hooks/useOrigami";
import OrigamiForm from "../components/OrigamiForm";
import GalleryControls from "../components/GalleryControls";
import GalleryGrid from "../components/GalleryGrid";

const Gallery = ({ isDarkMode, user }) => {
  // Data Hook
  const { items, loading, deleteItem } = useOrigami();

  // Local UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Derived State
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const editingItem = items.find((i) => i.id === editingId) || null;

  const handleEdit = (item) => setEditingId(item.id);
  const handleCancelEdit = () => setEditingId(null);

  // Wrapper for delete to prevent event bubbling issues if any
  const handleDeleteWrapper = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteItem(id);
  };

  return (
    <>
      <SEO
        title="Zsombor Pinter | Gallery"
        description="Browse a collection of origami models. Folded by Zsombor Pinter."
        path="/gallery"
      />

      <div className="animate-in slide-in-from-right-4 duration-500">
        {/* Admin Section */}
        {user && (
          <OrigamiForm
            isDarkMode={isDarkMode}
            editingItem={editingItem}
            onCancelEdit={handleCancelEdit}
          />
        )}

        {/* Controls */}
        <GalleryControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
        />

        {/* Grid Display */}
        <GalleryGrid
          items={filteredItems}
          loading={loading}
          user={user}
          isDarkMode={isDarkMode}
          onEdit={handleEdit}
          onDelete={handleDeleteWrapper}
        />
      </div>
    </>
  );
};

export default Gallery;
