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

  // --- SCHEMA.ORG: IMAGE GALLERY ---
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Zsombor Pintér's Origami Gallery",
    description: "A collection of hand-folded origami models.",
    url: "https://www.zsombor-pinter.site/gallery",
    creator: {
      "@type": "Person",
      name: "Zsombor Pintér",
    },
    // ImageObjects
    hasPart: items
      .filter((item) => item.image)
      .map((item) => ({
        "@type": "ImageObject",
        contentUrl: item.image, // image's link
        thumbnailUrl: item.image,
        name: item.title,
        description: `Origami model of ${item.title}`,
        creator: {
          "@type": "Person",
          name: item.artist || "Unknown Artist",
        },
      })),
  };

  return (
    <>
      <SEO
        title="Zsombor Pintér | Gallery"
        description="Browse a collection of origami models. Folded by Zsombor Pintér."
        path="/gallery"
      />

      {!loading && (
        <script type="application/ld+json">
          {JSON.stringify(gallerySchema)}
        </script>
      )}

      <div>
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
