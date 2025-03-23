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
    <nav className="bg-blue-500 text-white px-4 py-3 flex flex-wrap items-center justify-between md:h-20">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain opacity-80" />
        </Link>
      </div>

      {/* Page Title - Centered */}
      <div className="flex-1 text-center">
        <h1 className="text-sm sm:text-lg md:text-xl font-semibold">{getPageTitle()}</h1>
      </div>

      {/* Search Bar on the Right */}
      <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end">
        <div className="relative w-32 sm:w-40 md:w-48 lg:w-56">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 pl-10 rounded-full border border-gray-300 text-black bg-white text-xs sm:text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Navigation Component
const Navigation = () => {
  const location = useLocation();

  // Get user type (either "student" or "staff"), defaulting to staff
  const userType = localStorage.getItem("userType") || "staff";
  const dashboardPath = userType === "student" ? "/studentdashboard" : "/dashboard";

  const getLinkClass = (path) => {
    return location.pathname === path ? "underline font-semibold" : "";
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-4 text-sm md:text-lg text-blue-800">
      <Link to={dashboardPath} className={getLinkClass(dashboardPath)}>Dashboard</Link>
      <Link to="/todo" className={getLinkClass("/todo")}>To-do</Link>
      <Link to="/notifications" className={getLinkClass("/notifications")}>Notifications</Link>
      <Link to="/inbox" className={getLinkClass("/inbox")}>Inbox</Link>
      <Link to="/settings" className={getLinkClass("/settings")}>Settings</Link>
    </div>
  );
};

export { Navigation };
