// src/components/AdminAddOrigami.jsx
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Plus } from "lucide-react";

export default function AdminAddOrigami() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    artist: "",
    paper: "",
    date: "",
    category: "Complex",
    difficulty: "Intermediate",
    desc: "",
  });

  const categories = ["Complex", "Tessellations", "Traditional"];

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.image) return alert("Title + image required");

    await addDoc(collection(db, "origami"), {
      ...form,
      createdAt: serverTimestamp(),
    });

    alert("Origami added!");
    setForm({
      title: "",
      image: "",
      artist: "",
      paper: "",
      date: "",
      category: "Complex",
      difficulty: "Intermediate",
      desc: "",
    });
  };

  return (
    <div className="p-6 border-2 border-red-300 bg-red-50 rounded-xl mb-12">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Plus /> Add New Origami
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submit}>
        <input className="p-2 border rounded" placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <input className="p-2 border rounded" placeholder="Image URL" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })} />

        <input className="p-2 border rounded" placeholder="Artist" value={form.artist}
          onChange={(e) => setForm({ ...form, artist: e.target.value })} />

        <input className="p-2 border rounded" placeholder="Paper Used" value={form.paper}
          onChange={(e) => setForm({ ...form, paper: e.target.value })} />

        <input type="date" className="p-2 border rounded" value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <select className="p-2 border rounded" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>

        <textarea className="md:col-span-2 p-2 border rounded" placeholder="Description"
          value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />

        <button type="submit" className="md:col-span-2 bg-red-500 text-white py-2 rounded">
          Add to Gallery
        </button>
      </form>
    </div>
  );
}
