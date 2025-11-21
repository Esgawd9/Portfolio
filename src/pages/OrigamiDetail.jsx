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

// ==========================================
// COMPONENT: DETAIL PAGE
// ==========================================
const OrigamiDetail = ({ isDarkMode }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  if (loading)
    return <div className="text-center py-20">Loading details...</div>;
  if (!item) return <div className="text-center py-20">Origami not found.</div>;

  return (
    <div className="animate-in fade-in duration-300">
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
            className="relative overflow-hidden shadow-2xl cursor-zoom-in group rounded-2xl"
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
              <div className="flex items-start gap-3">
                <Layers className={`${THEME.accent.text} mt-1 w-5 h-5`} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Difficulty
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold mt-1 bg-gray-100 text-gray-800">
                    {item.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Description</h3>
        <p className={`leading-relaxed ${textSub} w-2/3`}>
          {item.desc || "No description."}
        </p>
      </div>
    </div>
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
