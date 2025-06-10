// src/components/BottomNav.jsx
import { Home, Tv, ListVideo, Newspaper, Info, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home },
  { to: "/programs", icon: ListVideo },
  { to: "/live", icon: Tv },
  { to: "/news", icon: Newspaper },
  { to: "/about", icon: Info },
  { to: "/contact", icon: Phone },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bg-white shadow-lg border-t flex justify-around py-2">
      {navItems.map(({ to, icon: Icon }) => (
        <Link key={to} to={to}>
          <Icon
            className={`w-6 h-6 ${
              location.pathname === to ? "text-blue-600" : "text-gray-500"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
