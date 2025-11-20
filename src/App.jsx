import React, { useState, useEffect, useRef } from "react";
// INSTRUCTIONS: If running locally, ensure 'npm install react-router-dom' is run
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  Moon,
  Sun,
  Code,
  Layers,
  Grid,
  Hash,
  Trash2,
  Plus,
  Lock,
  LogOut,
  Search,
  X,
  ZoomIn,
  ArrowLeft,
  Calendar,
  User,
  Scroll,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Pencil,
  Github,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Terminal,
  Cpu,
  FileText,
  Linkedin,
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyBE50-IY2rJvXZc4sdCBxAZxQIjOyQGgkg",
  authDomain: "portfolio-ad827.firebaseapp.com",
  projectId: "portfolio-ad827",
  storageBucket: "portfolio-ad827.firebasestorage.app",
  messagingSenderId: "96017797536",
  appId: "1:96017797536:web:1694df640730e8344454c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ==========================================
//  🎨 THEME CONFIGURATION
// ==========================================
const THEME = {
  accent: {
    text: "text-red-500",
    textHover: "hover:text-red-500",
    bg: "bg-red-500",
    bgHover: "hover:bg-red-600",
    border: "border-red-300",
    lightBg: "bg-red-100",
    lightText: "text-red-600",
  },
  secondary: {
    text: "text-blue-500",
    textHover: "hover:text-blue-600",
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-600",
    border: "border-blue-300",
    lightBg: "bg-blue-50",
  },
  dark: {
    bg: "bg-slate-900",
    nav: "bg-slate-900/80",
    text: "text-slate-100",
    textSub: "text-slate-400",
    card: "bg-slate-800",
    border: "border-slate-700",
    input: "bg-slate-700",
    inputBorder: "border-slate-600",
    inputText: "text-white",
    footer: "bg-slate-900 border-slate-800",
  },
  light: {
    bg: "bg-stone-50",
    nav: "bg-white/80",
    text: "text-stone-800",
    textSub: "text-stone-600",
    card: "bg-white",
    border: "border-stone-200",
    input: "bg-white",
    inputBorder: "border-stone-300",
    inputText: "text-black",
    footer: "bg-stone-100 border-stone-200",
  },
};

// ==========================================
// HELPER: SCROLL TO TOP
// ==========================================
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ==========================================
// COMPONENT: NAVBAR
// ==========================================
const Navbar = ({ isDarkMode, toggleTheme, user, setShowLoginModal }) => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? THEME.accent.text
      : `${THEME.accent.textHover}`;
  const navClasses = `${isDarkMode ? THEME.dark.nav : THEME.light.nav} ${
    isDarkMode ? THEME.dark.border : THEME.light.border
  }`;
  const textClasses = isDarkMode ? THEME.dark.text : THEME.light.text;

  return (
    <nav
      className={`sticky top-0 z-40 backdrop-blur-md border-b ${navClasses}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <Layers className={`w-6 h-6 ${THEME.accent.text}`} />
          <span className={textClasses}>Portfolio</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-medium text-sm">
            <Link to="/" className={`transition-colors ${isActive("/")}`}>
              CV & Projects
            </Link>
            <Link
              to="/gallery"
              className={`transition-colors ${isActive("/gallery")}`}
            >
              Gallery
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={() => signOut(auth)}
                className={`${THEME.accent.text} text-sm font-bold flex items-center gap-1 mr-2`}
              >
                <LogOut size={16} />
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className={`opacity-20 hover:opacity-100 transition-opacity mr-2 ${textClasses}`}
              >
                <Lock size={16} />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "hover:bg-slate-700 text-yellow-400"
                  : "hover:bg-stone-200 text-stone-600"
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ==========================================
// COMPONENT: FOOTER
// ==========================================
const Footer = ({ isDarkMode }) => {
  const year = new Date().getFullYear();
  const textClass = isDarkMode ? "text-slate-500" : "text-stone-500";
  const footerClass = isDarkMode ? THEME.dark.footer : THEME.light.footer;

  return (
    <footer className={`py-10 text-center border-t mt-20 ${footerClass}`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className={textClass}>
          © {year} Pintér Zsombor. Built with React & Firebase.
        </p>
        <div className="flex gap-6 text-sm font-medium">
          <a
            href="https://github.com/Esgawd9"
            target="_blank"
            rel="noreferrer"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="mailto:zsombor.pinter0105@gmail.com"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
          >
            <Mail size={14} /> Email
          </a>
          
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// COMPONENT: NOT FOUND (404)
// ==========================================
const NotFound = ({ isDarkMode }) => (
  <div className="text-center py-32 animate-in fade-in zoom-in duration-500">
    <div className="inline-block p-6 rounded-full bg-red-50 dark:bg-slate-800 mb-6">
      <Hash size={64} className="text-red-500" />
    </div>
    <h1 className={`text-6xl font-bold mb-4 ${THEME.accent.text}`}>404</h1>
    <p
      className={`text-xl mb-8 ${
        isDarkMode ? "text-slate-400" : "text-stone-600"
      }`}
    >
      Oops! This page has folded itself into oblivion.
    </p>
    <Link
      to="/"
      className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} transition-transform hover:-translate-y-1 inline-block`}
    >
      Return Home
    </Link>
  </div>
);

// ==========================================
// COMPONENT: HOME PAGE (DIGITAL CV)
// ==========================================
const Home = ({ isDarkMode }) => {
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const bgSecondary = isDarkMode ? "bg-slate-700" : "bg-stone-100";

  return (
    <div className="space-y-24 animate-in slide-in-from-left-4 duration-500">
      {/* 1. HERO SECTION */}
      <header className="text-center py-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Pinter <span className={THEME.accent.text}>Zsombor</span>
        </h1>

        <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${textSub}`}>
          Aspiring Software Engineer
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
          <a
            href="mailto:zsombor.pinter0105@gmail.com"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <Mail size={16} className={THEME.accent.text} />
            Email Me
          </a>

          <a
            href="https://github.com/Esgawd9"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <Github size={16} className={THEME.accent.text} />
            GitHub
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/gallery"
            className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} transition-transform hover:-translate-y-1 inline-flex items-center`}
          >
            View Origami Gallery
          </Link>

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Zsombor_Pinter_Resume.pdf"
            className={`px-8 py-3 rounded-full font-bold border inline-flex items-center gap-2 transition-transform hover:-translate-y-1 ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <FileText size={18} />
            Download CV
          </a>
        </div>
      </header>

      {/* 2. TECHNICAL SKILLS */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Terminal className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Python",
            "Java",
            "C/C++",
            "JavaScript",
            "React",
            "PHP",
            "HTML/CSS",
            "SQL",
            "Git",
            "PlatformOS",
          ].map((skill) => (
            <div
              key={skill}
              className={`p-4 rounded-xl border text-center font-medium transition-transform hover:-translate-y-1 ${cardBg} ${border}`}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCE & EDUCATION */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Experience */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className={`p-6 rounded-2xl border h-full ${cardBg} ${border}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Intern - Web Developer</h3>
                <p className={`${THEME.accent.text} font-bold`}>
                  Origin Develop Kft.
                </p>
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wide ${THEME.accent.lightBg} ${THEME.accent.lightText} px-2 py-1 rounded`}
              >
                2025 (3 months)
              </span>
            </div>
            <ul
              className={`list-disc list-inside space-y-3 text-sm leading-relaxed ${textSub}`}
            >
              <li>
                Developed and maintained frontend features for a
                PlatformOS-hosted website using HTML, CSS, JavaScript, and
                Liquid.
              </li>
              <li>
                Collaborated in an agile team, ensuring seamless integration of
                frontend components.
              </li>
              <li>
                Debugged and optimized code to improve website performance.
              </li>
              <li>Assisted in version control workflows using Git.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${cardBg} ${border}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Software Engineering BSc</h3>
                <span className="text-sm opacity-60">2022 - Present</span>
              </div>
              <p className={`${THEME.accent.text} font-medium`}>
                University of Szeged
              </p>
              <p className={`text-sm mt-2 ${textSub}`}>
                Faculty of Science and Informatics
              </p>
            </div>
            <div
              className={`p-6 rounded-2xl border opacity-60 ${cardBg} ${border}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">High School Diploma</h3>
                <span className="text-sm">2017 - 2021</span>
              </div>
              <p>Dombóvári Illyés Gyula Gimnázium</p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. FEATURED PROJECTS */}
      <section id="projects">
        <div className="flex items-center gap-3 mb-8">
          <Code className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg border flex flex-col ${cardBg} ${border}`}
          >
            <div
              className={`p-8 flex-grow flex flex-col justify-center items-center ${bgSecondary}`}
            >
              <Hash size={64} className={`${THEME.accent.text} mb-4`} />
              <h3 className="text-2xl font-bold">Maze Solver</h3>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">
                Pathfinding Algorithm Visualizer
              </h3>
              <p className={`mb-4 text-sm ${textSub}`}>
                Interactive web app visualizing maze generation and solving
                algorithms (DFS, BFS).
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  JavaScript
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  HTML/CSS
                </span>
              </div>
              <a
                href="/maze.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
              >
                Launch Project <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg border flex flex-col ${cardBg} ${border}`}
          >
            <div
              className={`p-8 flex-grow flex flex-col justify-center items-center ${bgSecondary}`}
            >
              <Cpu size={64} className={`${THEME.accent.text} mb-4`} />
              <h3 className="text-2xl font-bold">Snake Game AI</h3>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Autonomous Agent</h3>
              <p className={`mb-4 text-sm ${textSub}`}>
                AI-controlled Snake developed in Java using A* and BFS
                pathfinding algorithms. Focused on optimization and logic.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  Java
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  A* Algorithm
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  AI
                </span>
              </div>
              <a
                href="https://github.com/Esgawd9"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
              >
                View on GitHub <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// COMPONENT: GALLERY CARD (Extracted for Image Loading State)
// ==========================================
const GalleryCard = ({
  item,
  user,
  isDarkMode,
  cardBg,
  border,
  textMain,
  handleEdit,
  handleDelete,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/gallery/${item.id}`}
      className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${cardBg} ${border}`}
    >
      {user && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEdit(item);
            }}
            className={`${THEME.secondary.bg} text-white p-2 rounded-full ${THEME.secondary.bgHover} shadow-lg`}
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(item.id, e)}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* IMPROVED IMAGE CONTAINER WITH LOADER */}
      <div
        className={`aspect-square overflow-hidden relative ${
          isDarkMode ? "bg-slate-900" : "bg-stone-100"
        }`}
      >
        {/* Spinner - Only visible when image is NOT loaded */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className={`animate-spin ${THEME.accent.text}`} size={32} />
          </div>
        )}

        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        />
        
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded backdrop-blur-sm z-10">
          {item.difficulty}
        </div>
      </div>

      <div className="p-4">
        <h3 className={`text-lg font-bold mb-2 ${textMain}`}>{item.title}</h3>
      </div>
    </Link>
  );
};

// ==========================================
// COMPONENT: GALLERY PAGE
// ==========================================
const Gallery = ({ isDarkMode, user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
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
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", msg: "" });
  const fileInputRef = useRef(null);

  // Updated Categories
  const categories = [
    "All",
    // "Animals",
    // "Fantasy",
    // "Insects",
    // "Modular",
    // "Tessellations",
    // "Traditional",
    // "Masks",
    // "Other",
  ];

  // Theme Shortcuts
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const textMain = isDarkMode ? THEME.dark.text : THEME.light.text;
  const inputClass = `p-2 rounded border w-full ${
    isDarkMode
      ? `${THEME.dark.input} ${THEME.dark.inputBorder} ${THEME.dark.inputText} placeholder-gray-400`
      : `${THEME.light.input} ${THEME.light.inputBorder} ${THEME.light.inputText}`
  }`;
  const dashBorder = isDarkMode ? "border-slate-600" : "border-stone-300";
  const hoverBg = isDarkMode ? "hover:bg-slate-700" : "hover:bg-stone-100";

  // Correct Admin Background Logic for Dark/Light Mode
  const adminBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : editingId
    ? "bg-blue-50 border-blue-200"
    : "bg-red-50 border-red-200";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "origami"), (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      category: item.category || "Animals",
      difficulty: item.difficulty || "Intermediate",
      image: item.image || "",
      desc: item.desc || "",
      artist: item.artist || "",
      paper: item.paper || "",
      date: item.date || "",
    });
    setImagePreview(null);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
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

  const handleSaveOrigami = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "", msg: "" });

    if (!formData.title)
      return setFormStatus({ type: "error", msg: "Title is required" });
    if (!imageFile && !formData.image)
      return setFormStatus({
        type: "error",
        msg: "Please provide an image (Upload or URL)",
      });

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

      if (editingId) {
        await updateDoc(doc(db, "origami", editingId), dataToSave);
        setFormStatus({ type: "success", msg: "Updated successfully!" });
      } else {
        await addDoc(collection(db, "origami"), {
          ...dataToSave,
          createdAt: serverTimestamp(),
        });
        setFormStatus({ type: "success", msg: "Added successfully!" });
      }

      handleCancelEdit();
      setTimeout(() => setFormStatus({ type: "", msg: "" }), 3000);
    } catch (error) {
      setFormStatus({ type: "error", msg: "Error: " + error.message });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Delete permanently?"))
      await deleteDoc(doc(db, "origami", id));
  };

  const filtered = items.filter((item) => {
    return (
      (activeTab === "All" || item.category === activeTab) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {user && (
        <div
          className={`mb-12 p-6 rounded-xl border-2 border-dashed ${adminBg}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil size={20} /> Edit Origami
                </>
              ) : (
                <>
                  <Plus size={20} /> Add New Origami
                </>
              )}
            </h3>
            {editingId && (
              <button
                onClick={handleCancelEdit}
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
            onSubmit={handleSaveOrigami}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Title"
              className={inputClass}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isUploading}
            />

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Image URL (Paste link here)"
                className={inputClass}
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                disabled={isUploading || imageFile}
              />

              <label
                className={`flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dashBorder} ${hoverBg} ${
                  isDarkMode ? "bg-slate-800" : "bg-white"
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

            {(imagePreview || formData.image) && (
              <div className="md:col-span-2 flex justify-center bg-black/5 p-2 rounded">
                <img
                  src={imagePreview || formData.image}
                  alt="Preview"
                  className="h-32 object-contain rounded"
                />
              </div>
            )}

            <select
              className={inputClass}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={isUploading}
            >
              {categories
                .filter((c) => c !== "All")
                .map((c) => (
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
              <option value="Simple">Simple</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Complex">Complex</option>
              <option value="Super Complex">Super Complex</option>
            </select>
            <input
              type="date"
              className={inputClass}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              disabled={isUploading}
            />
            <input
              placeholder="Artist / Designer"
              className={inputClass}
              value={formData.artist}
              onChange={(e) =>
                setFormData({ ...formData, artist: e.target.value })
              }
              disabled={isUploading}
            />
            <input
              placeholder="Paper Type"
              className={inputClass}
              value={formData.paper}
              onChange={(e) =>
                setFormData({ ...formData, paper: e.target.value })
              }
              disabled={isUploading}
            />

            <textarea
              placeholder="Description..."
              className={`${inputClass} md:col-span-2`}
              rows="2"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              disabled={isUploading}
            />

            <button
              type="submit"
              disabled={isUploading}
              className={`md:col-span-2 text-white py-3 rounded font-bold flex items-center justify-center gap-2 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : editingId
                  ? `${THEME.secondary.bg} ${THEME.secondary.bgHover}`
                  : `${THEME.accent.bg} ${THEME.accent.bgHover}`
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" />{" "}
                  {editingId ? "Updating..." : "Uploading..."}
                </>
              ) : editingId ? (
                "Update Origami"
              ) : (
                "Add to Gallery"
              )}
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex items-center gap-3">
          <Grid className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Gallery</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 ${inputClass}`}
            />
          </div>
          <div
            className={`inline-flex p-1 rounded-lg overflow-x-auto ${
              isDarkMode ? "bg-slate-800" : "bg-stone-200"
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? isDarkMode
                      ? "bg-slate-600 text-white"
                      : "bg-white text-stone-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className={`h-80 rounded-xl ${
                isDarkMode ? "bg-slate-800" : "bg-stone-200"
              }`}
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              user={user}
              isDarkMode={isDarkMode}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              cardBg={cardBg}
              border={border}
              textMain={textMain}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className={`${THEME.accent.text} mt-1 w-5 h-5`}>{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase font-bold">{label}</p>
      <p className="font-medium">{value || "Unknown"}</p>
    </div>
  </div>
);

// ==========================================
// MAIN APP
// ==========================================
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login Failed");
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <ScrollToTop />
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          isDarkMode
            ? `dark ${THEME.dark.bg} ${THEME.dark.text}`
            : `${THEME.light.bg} ${THEME.light.text}`
        }`}
      >
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          user={user}
          setShowLoginModal={setShowLoginModal}
        />

        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <form
              onSubmit={handleLogin}
              className="bg-white p-8 rounded-lg shadow-xl w-96 text-black"
            >
              <h2 className="text-xl font-bold mb-4">Admin Access</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-3 p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 ${THEME.accent.bg} text-white rounded ${THEME.accent.bgHover}`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}

        <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route
              path="/gallery"
              element={<Gallery isDarkMode={isDarkMode} user={user} />}
            />
            <Route
              path="/gallery/:id"
              element={<OrigamiDetail isDarkMode={isDarkMode} />}
            />
            <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
};

export default App;
