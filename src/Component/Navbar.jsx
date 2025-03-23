import { Search } from "lucide-react"; // Importing the search icon
import { useLocation } from "react-router-dom";
import logo from "../assets/images/Home.png"; // Importing the logo
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
    <nav className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between h-16 md:h-20">
      {/* Logo on the Left */}
      <div className="flex items-center flex-shrink-0">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain opacity-80" />
        </Link>
      </div>

      {/* Page Title in the Center */}
      <div className="hidden sm:flex flex-1 justify-center">
        <h1 className="text-lg md:text-xl font-semibold text-center">{getPageTitle()}</h1>
      </div>

      {/* Search Bar on the Right - Adjusted Width */}
      <div className="flex justify-end w-auto">
        <div className="relative w-32 sm:w-40 md:w-48 lg:w-56">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 pl-10 rounded-full border border-gray-300 text-black bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
