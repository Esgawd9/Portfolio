// src/pages/Home.jsx
import Hero from "../components/Hero";
import FeaturedProject from "../components/FeaturedProject";

export default function Home({ isDarkMode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-24">
      <Hero isDarkMode={isDarkMode} />
      <FeaturedProject isDarkMode={isDarkMode} />
    </div>
  );
}
