import { Moon, Sun, Lock, LogOut, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ isDarkMode, setIsDarkMode, user, setShowLoginModal }) {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Layers className="text-red-500" /> Portfolio
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-red-500">Projects</Link>
          <Link to="/gallery" className="hover:text-red-500">Gallery</Link>

          {user ? (
            <button onClick={() => signOut(auth)} className="text-red-500">
              <LogOut size={18} />
            </button>
          ) : (
            <button onClick={() => setShowLoginModal(true)}>
              <Lock size={18} className="opacity-50 hover:opacity-100" />
            </button>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full"
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>

      </div>
    </nav>
  );
}