// src/components/GalleryGrid.jsx
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function GalleryGrid({ data, loading, user }) {
  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((item) => (
        <Link
          to={`/detail/${item.id}`}
          key={item.id}
          className="group relative border rounded-xl overflow-hidden"
        >
          {user && (
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm("Delete this?"))
                  await deleteDoc(doc(db, "origami", item.id));
              }}
            >
              <Trash2 size={16} />
            </button>
          )}

          <img src={item.image} className="h-48 w-full object-cover" />

          <div className="p-4">
            <p className="text-xs text-red-500">{item.category}</p>
            <h3 className="text-lg font-bold">{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
