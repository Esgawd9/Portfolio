// ==========================================
// FILE: useOrigami.jsx
// DESCRIPTION: Custom hook for managing origami data from Firestore.
// ==========================================

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useOrigami = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "origami"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    if (window.confirm("Delete permanently?")) {
      await deleteDoc(doc(db, "origami", id));
    }
  };

  return { items, loading, deleteItem };
};
