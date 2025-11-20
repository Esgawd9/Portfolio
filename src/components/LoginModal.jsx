// src/components/LoginModal.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginModal({ close }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      close();
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg w-96" onSubmit={login}>
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="email"
          className="w-full p-2 border mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button type="button" className="text-gray-500" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
