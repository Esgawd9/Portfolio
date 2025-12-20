// ==========================================
// FILE: OrigamiForm.jsx
// DESCRIPTION: Form component for adding and editing origami models.
// ==========================================

import React, { useState, useEffect, useRef } from "react";
import { Pencil, Plus, Upload, Loader2 } from "lucide-react";
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { THEME } from "../config/theme";

const OrigamiForm = ({ isDarkMode, editingItem, onCancelEdit }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", msg: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Animals",
    difficulty: "Intermediate",
    image: "",
    desc: "",
    artist: "",
    paper: "",
    date: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || "",
        category: editingItem.category || "Animals",
        difficulty: editingItem.difficulty || "Intermediate",
        image: editingItem.image || "",
        desc: editingItem.desc || "",
        artist: editingItem.artist || "",
        paper: editingItem.paper || "",
        date: editingItem.date || "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Animals",
      difficulty: "Intermediate",
      image: "",
      desc: "",
      artist: "",
      paper: "",
      date: "",
    });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "", msg: "" });

    if (!formData.title)
      return setFormStatus({ type: "error", msg: "Title is required" });
    if (!imageFile && !formData.image)
      return setFormStatus({ type: "error", msg: "Image required" });

    setIsUploading(true);
    try {
      let finalImageUrl = formData.image;
      if (imageFile) {
        const storageRef = ref(
          storage,
          `origami/${Date.now()}_${imageFile.name}`
        );
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const dataToSave = { ...formData, image: finalImageUrl };

      if (editingItem) {
        await updateDoc(doc(db, "origami", editingItem.id), dataToSave);
        setFormStatus({ type: "success", msg: "Updated successfully!" });
        onCancelEdit(); // Close edit mode
      } else {
        await addDoc(collection(db, "origami"), {
          ...dataToSave,
          createdAt: serverTimestamp(),
        });
        setFormStatus({ type: "success", msg: "Added successfully!" });
        resetForm();
      }
      setTimeout(() => setFormStatus({ type: "", msg: "" }), 3000);
    } catch (error) {
      setFormStatus({ type: "error", msg: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  // Styles
  const inputClass = `p-2 rounded border w-full ${
    isDarkMode
      ? `${THEME.dark.input} ${THEME.dark.inputBorder} ${THEME.dark.inputText} placeholder-gray-400`
      : `${THEME.light.input} ${THEME.light.inputBorder} ${THEME.light.inputText}`
  }`;
  const adminBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : editingItem
    ? "bg-blue-50 border-blue-200"
    : "bg-red-50 border-red-200";

  return (
    <div className={`mb-12 p-6 rounded-xl border-2 border-dashed ${adminBg}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl flex items-center gap-2">
          {editingItem ? (
            <>
              <Pencil size={20} /> Edit Origami
            </>
          ) : (
            <>
              <Plus size={20} /> Add New Origami
            </>
          )}
        </h3>
        {editingItem && (
          <button
            onClick={onCancelEdit}
            className={`text-sm text-gray-500 ${THEME.accent.textHover} underline`}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {formStatus.msg && (
        <div
          className={`mb-4 p-3 rounded flex gap-2 ${
            formStatus.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {formStatus.msg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <input
          placeholder="Title"
          className={inputClass}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={isUploading}
        />

        {/* Image Input Block */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Image URL"
            className={inputClass}
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            disabled={isUploading || imageFile}
          />
          <label
            className={`flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDarkMode
                ? "bg-slate-800 border-slate-600 hover:bg-slate-700"
                : "bg-white border-stone-300 hover:bg-stone-100"
            }`}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Upload size={16} />{" "}
              {imageFile ? imageFile.name : "Or upload file"}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Preview */}
        {(imagePreview || formData.image) && (
          <div className="md:col-span-2 flex justify-center bg-black/5 p-2 rounded">
            <img
              src={imagePreview || formData.image}
              alt="Preview"
              className="h-32 object-contain rounded"
            />
          </div>
        )}

        {/* Dropdowns & Details */}
        <select
          className={inputClass}
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          disabled={isUploading}
        >
          {["Animals", "Fantasy", "Insects", "Modular", "Other"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className={inputClass}
          value={formData.difficulty}
          onChange={(e) =>
            setFormData({ ...formData, difficulty: e.target.value })
          }
          disabled={isUploading}
        >
          {["Simple", "Intermediate", "Complex", "Super Complex"].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="date"
          className={inputClass}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          disabled={isUploading}
        />
        <input
          placeholder="Artist / Designer"
          className={inputClass}
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          disabled={isUploading}
        />
        <input
          placeholder="Paper Type"
          className={inputClass}
          value={formData.paper}
          onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
          disabled={isUploading}
        />
        <textarea
          placeholder="Description..."
          className={`${inputClass} md:col-span-2`}
          rows="2"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          disabled={isUploading}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`md:col-span-2 text-white py-3 rounded font-bold flex items-center justify-center gap-2 ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : editingItem
              ? `${THEME.secondary.bg} ${THEME.secondary.bgHover}`
              : `${THEME.accent.bg} ${THEME.accent.bgHover}`
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin" />{" "}
              {editingItem ? "Updating..." : "Uploading..."}
            </>
          ) : editingItem ? (
            "Update Origami"
          ) : (
            "Add to Gallery"
          )}
        </button>
      </form>
    </div>
  );
};

export default OrigamiForm;
