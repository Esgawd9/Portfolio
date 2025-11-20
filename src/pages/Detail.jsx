import { useParams, Link } from "react-router-dom";
import DetailView from "../components/DetailView";

export default function Detail({ data, setLightboxImage, isDarkMode }) {
  const { id } = useParams();
  const item = data.find(o => o.id === id);

  if (!item) return <p className="p-8">Item not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/gallery" className="text-red-500 font-bold">← Back</Link>
      <DetailView 
        item={item} 
        setLightboxImage={setLightboxImage} 
        isDarkMode={isDarkMode}
      />
    </div>
  );
}