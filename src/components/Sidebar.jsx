// src/components/Sidebar.jsx
import { Home, Tv, ListVideo, Newspaper, Info, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="p-4 space-y-4">
      <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
        <Home size={20} /> Home
      </Link>
      <Link to="/programs" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
        <ListVideo size={20} /> Programs
      </Link>
      <Link to="/live" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
        <Tv size={20} /> Live TV
      </Link>
      <Link to="/news" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
        <Newspaper size={20} /> News
      </Link>
      <Link to="/about" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
        <Info size={20} /> About
      </Link>
      <Link to="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
        <Phone size={20} /> Contact
      </Link>
    </nav>
  );
};

export default Sidebar;
