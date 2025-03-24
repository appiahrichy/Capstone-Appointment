import { Search, Home } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "WELCOME TO YOUR DASHBOARD";
      case "/notifications":
        return "WELCOME TO YOUR NOTIFICATIONS";
      case "/todo":
        return "WELCOME TO YOUR TO-DO LIST";
      case "/inbox":
        return "WELCOME TO YOUR INBOX";
      case "/settings":
        return "WELCOME TO YOUR SETTINGS";
      default:
        return "WELCOME TO YOUR DASHBOARD";
    }
  };

  return (
    <nav className="bg-blue-500 text-white px-4 flex items-center justify-between w-full shadow-md 
      h-12 sm:h-14 md:h-16 lg:h-20">
      {/* Left Section - Home Button */}
      <Link to="/" className="flex items-center">
        <Home className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white opacity-90" />
      </Link>

      {/* Middle Section - Centered Title with Responsive Text Size */}
      <div className="flex-grow flex justify-center px-2">
        <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-center whitespace-nowrap">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right Section - Search Bar (Remains Compact) */}
      <div className="relative w-20 sm:w-28 md:w-36 lg:w-48">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-2 py-1 pl-7 rounded-full border border-gray-300 text-black bg-white text-xs sm:text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
    </nav>
  );
};

export default Navbar;
