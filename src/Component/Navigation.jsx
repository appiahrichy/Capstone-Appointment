import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import { 
  AiOutlineDashboard, 
  AiOutlineCheckSquare, 
  AiOutlineBell, 
  AiOutlineMail, 
  AiOutlineSetting 
} from "react-icons/ai";
import { useState, useEffect } from "react";

const Navigation = () => {
  const location = useLocation();
  const { translate } = useLanguage();
  const [unreadCount, setUnreadCount] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Get user type (either "student" or "staff"), defaulting to staff
  const userType = localStorage.getItem("userType") || "staff";
  const dashboardPath = userType === "student" ? "/studentdashboard" : "/dashboard";

  // Fetch unread notifications count
  useEffect(() => {
    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, []);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
      isActive 
        ? "bg-blue-50 text-blue-600 font-semibold shadow-md transform scale-105" 
        : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
    }`;
  };

  const navItems = [
    { path: dashboardPath, label: "Dashboard", icon: <AiOutlineDashboard size={22} /> },
    { path: "/todo", label: "To-do", icon: <AiOutlineCheckSquare size={22} /> },
    { 
      path: "/notifications", 
      label: "Notifications", 
      icon: <AiOutlineBell size={22} />,
      badge: unreadCount > 0 ? unreadCount : null
    },
    { path: "/inbox", label: "Inbox", icon: <AiOutlineMail size={22} /> },
    { path: "/settings", label: "Settings", icon: <AiOutlineSetting size={22} /> }
  ];

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${getLinkClass(item.path)} relative group`}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-medium">{item.label}</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              {hoveredItem === item.path && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
