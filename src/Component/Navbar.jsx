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
    <nav className="bg-blue-500 text-white px-4 py-3 flex flex-wrap items-center justify-between h-auto md:h-20">
      {/* Logo on the Left */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain opacity-80" />
        </Link>
      </div>

      {/* Page Title - Now Visible on Small Screens */}
      <div className="w-full md:w-auto text-center mt-2 md:mt-0">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold">{getPageTitle()}</h1>
      </div>

      {/* Search Bar on the Right */}
      <div className="flex justify-end w-auto mt-2 md:mt-0">
        <div className="relative w-28 sm:w-36 md:w-44 lg:w-52">
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
