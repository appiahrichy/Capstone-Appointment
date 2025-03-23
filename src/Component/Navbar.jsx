import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const getPageTitle = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Welcome To Your DASHBOARD';
      case '/studentdashboard':
        return 'Welcome To Your DASHBOARD';
      case '/todo':
        return 'Welcome To Your TODO';
      case '/notifications':
        return 'Welcome To Your NOTIFICATIONS';
      case '/inbox':
        return 'Welcome To Your INBOX';
      case '/settings':
        return 'Welcome To Your SETTINGS';
      default:
        return 'Welcome';
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
