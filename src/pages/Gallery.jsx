// src/pages/Gallery.jsx
import AdminAddOrigami from "../components/AdminAddOrigami";
import GalleryGrid from "../components/GalleryGrid";

export default function Gallery({ data, loading, user, setLightboxImage }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {user && <AdminAddOrigami />}
      <GalleryGrid 
        data={data} 
        loading={loading}
        user={user}
        setLightboxImage={setLightboxImage}
      />
    </div>
  );
}
