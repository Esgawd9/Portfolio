// src/components/Hero.jsx
export default function Hero({ isDarkMode }) {
  return (
    <header className="text-center py-12">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Folding Ideas into <span className="text-red-500">Reality</span>
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl mx-auto">
        Welcome to my digital gallery. I build logic with code and sculptures with paper.
      </p>

      <a
        href="/gallery"
        className={`mt-8 inline-block px-8 py-3 bg-red-500 ${isDarkMode ? 'text-white' : 'text-black' } rounded-full font-bold hover:bg-red-600`}
      >
        Explore Gallery
      </a>
    </header>
  );
}
