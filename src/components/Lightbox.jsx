// src/components/Lightbox.jsx
import { X } from "lucide-react";

export default function Lightbox({ image, close }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={close}
    >
      <button className="absolute top-6 right-6 text-white">
        <X size={32} />
      </button>
      <img
        src={image}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
