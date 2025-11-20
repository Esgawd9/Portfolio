// src/components/DetailView.jsx
import { ZoomIn, User, Scroll, Calendar, Layers } from "lucide-react";

export default function DetailView({ item, setLightboxImage, isDarkMode }) {
  return (
    <div className="">
      <div
        className="relative overflow-hidden rounded-xl shadow cursor-zoom-in mb-10"
        onClick={() => setLightboxImage(item.image)}
      >
        <img src={item.image} className="w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <ZoomIn size={48} className="text-white" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
          <p className="text-gray-600">
            {item.desc || "No description provided."}
          </p>
        </div>

        <div className="p-6 border rounded-xl space-y-6">
          <div className="flex gap-3">
            <User className="text-red-500" />
            <div>
              <p className="text-xs text-gray-500">Artist</p>
              <p>{item.artist || "Unknown"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Scroll className="text-red-500" />
            <div>
              <p className="text-xs text-gray-500">Paper</p>
              <p>{item.paper || "Standard Kami"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Calendar className="text-red-500" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p>{item.date || "Unknown"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Layers className="text-red-500" />
            <div>
              <p className="text-xs text-gray-500">Difficulty</p>
              <p>{item.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
