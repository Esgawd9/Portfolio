import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Lightbox from "./components/Lightbox";
import LoginModal from "./components/LoginModal";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

// pages
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Detail from "./pages/Detail";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [origamiPortfolio, setOrigamiPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [lightboxImage, setLightboxImage] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Firebase listeners
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, setUser);
    const unsubData = onSnapshot(collection(db, "origami"), (snapshot) => {
      setOrigamiPortfolio(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubData();
    };
  }, []);

  return (
    <Router>
      <div className={isDarkMode ? "dark" : ""}>
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          user={user}
          setShowLoginModal={setShowLoginModal}
        />

        {lightboxImage && (
          <Lightbox
            image={lightboxImage}
            close={() => setLightboxImage(null)}
          />
        )}

        {showLoginModal && (
          <LoginModal close={() => setShowLoginModal(false)} />
        )}

        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />

          <Route
            path="/gallery"
            element={
              <Gallery
                data={origamiPortfolio}
                loading={loading}
                user={user}
                setLightboxImage={setLightboxImage}
              />
            }
          />

          <Route
            path="/detail/:id"
            element={
              <Detail
                data={origamiPortfolio}
                setLightboxImage={setLightboxImage}
                isDarkMode={isDarkMode}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
