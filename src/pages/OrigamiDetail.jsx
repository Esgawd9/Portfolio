// =========================================
// FILE: OrigamiDetail.jsx
// DESCRIPTION: Detail page component for individual origami models in the gallery.
// =========================================

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  X,
  ArrowLeft,
  ZoomIn,
  User,
  Scroll,
  Calendar,
  Layers,
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { THEME } from "../config/theme";

import SEO from "../components/SEO";

// ==========================================
// COMPONENT: DETAIL PAGE
// ==========================================
const OrigamiDetail = ({ isDarkMode }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const skeletonClass = `rounded-xl ${    
    isDarkMode ? "bg-slate-800" : "bg-stone-200"
  }`;

  // Theme shortcuts
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, "origami", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setItem({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    };
    if (id) fetchItem();
  }, [id]);

  if (loading) {
    return (
      <>
        <SEO
          title="Gallery"
          description="Folded by Zsombor Pintér"
          path={`/gallery/${id}`}
        />

        <div className="animate-pulse space-y-8 max-w-6xl mx-auto">
          {/* Back Button Skeleton */}
          <div className={`h-6 w-32 ${skeletonClass}`} />

          {/* Title Skeleton */}
          <div className={`h-12 w-3/4 pb-4 ${skeletonClass}`} />

          {/* Main Content Grid Skeleton */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Large Image Placeholder */}
            <div className="lg:w-2/3">
              <div
                className={`w-full aspect-video shadow-lg ${skeletonClass}`}
              />
            </div>

            {/* Right Column: Info Panel Skeleton */}
            <div className="lg:w-1/3 space-y-8">
              <div
                className={`p-6 border rounded-xl h-64 space-y-4 ${
                  isDarkMode ? "border-slate-700" : "border-stone-200"
                }`}
              >
                {/* Panel Title */}
                <div className={`h-6 w-1/2 mb-6 ${skeletonClass}`} />

                {/* Info Rows (Artist, Paper, etc) */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full ${skeletonClass}`} />
                    <div className="space-y-2 flex-1">
                      <div className={`h-3 w-1/3 ${skeletonClass}`} />
                      <div className={`h-4 w-2/3 ${skeletonClass}`} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full ${skeletonClass}`} />
                    <div className="space-y-2 flex-1">
                      <div className={`h-3 w-1/3 ${skeletonClass}`} />
                      <div className={`h-4 w-2/3 ${skeletonClass}`} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full ${skeletonClass}`} />
                    <div className="space-y-2 flex-1">
                      <div className={`h-3 w-1/3 ${skeletonClass}`} />
                      <div className={`h-4 w-2/3 ${skeletonClass}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-3 w-2/3">
            <div className={`h-4 w-full ${skeletonClass}`} />
            <div className={`h-4 w-full ${skeletonClass}`} />
            <div className={`h-4 w-3/4 ${skeletonClass}`} />
          </div>
        </div>
      </>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-32">
        <h1 className={`text-4xl font-bold mb-4 ${THEME.accent.text}`}>
          Model Not Found
        </h1>
        <p
          className={`text-lg mb-8 ${
            isDarkMode ? "text-slate-400" : "text-stone-600"
          }`}
        >
          The origami model you are looking for does not exist.
        </p>
        <Link

          to="/gallery"
          className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} transition-transform hover:-translate-y-1 inline-block`}
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Gallery | ${item.title}`}
        description={`Folded by Zsombor Pintér: ${item.title}`}
        path={`/gallery/${id}`}
      />

      <div>
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className={`absolute top-6 right-6 text-white ${THEME.accent.textHover}`}
            >
              <X size={32} />
            </button>
            <img
              src={item.image}
              alt="Full"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <Link
          to="/gallery"
          className={`flex items-center gap-2 text-sm font-semibold mb-6 text-gray-500 ${THEME.accent.textHover} transition-colors`}
          aria-label="Back to Gallery"
        >
          <ArrowLeft size={18} /> Back to Gallery
        </Link>

        <div className={`mb-8 pb-4 border-b ${border}`}>
          {/* <span
          className={`${THEME.accent.text} font-bold tracking-wider uppercase text-sm`}
        >
          {item.difficulty}
        </span> */}
          <h1 className="text-4xl md:text-5xl font-bold mt-2">{item.title}</h1>
        </div>

        <div className="mb-8 pb-4 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div
              className="relative overflow-hidden shadow-2xl cursor-zoom-in group rounded-xl"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                  size={48}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 space-y-8">
            <div className={`p-6 rounded-xl border ${cardBg} ${border}`}>
              <h3
                className={`text-lg font-bold mb-4 border-b pb-2 ${
                  isDarkMode ? "border-slate-600" : "border-stone-300"
                }`}
              >
                Model Details
              </h3>
              <div className="space-y-4">
                <InfoRow icon={<User />} label="Artist" value={item.artist} />
                <InfoRow icon={<Scroll />} label="Paper" value={item.paper} />
                <InfoRow icon={<Calendar />} label="Date" value={item.date} />
                <InfoRow icon={<Layers />} label="Difficulty" value={item.difficulty} />
              </div>
            </div>
          </div>
        </div>
        <div className={`p-6 rounded-xl border ${cardBg} ${border}`}>
          <h3 className="text-xl font-bold mb-3">Description</h3>
          <p className={`leading-relaxed ${textSub} lg:w-2/3`}>
            {item.desc || "No description."}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrigamiDetail;

// ==========================================
// COMPONENT: INFO ROW
// ==========================================
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className={`${THEME.accent.text} mt-1 w-5 h-5`}>{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase font-bold">{label}</p>
      <p className="font-medium">{value || "Unknown"}</p>
    </div>
  </div>
);
