import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";

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
    <nav className="bg-blue-500 text-white px-4 flex items-center justify-between w-full shadow-md 
      h-12 sm:h-14 md:h-16 lg:h-20">
      
      {/* Left Section - AppointmentPro Text */}
      <div className="text-lg font-bold">AppointmentPro</div>

      {/* Middle Section - Centered Title */}
      <div className="flex-grow flex justify-center px-2">
        <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-center whitespace-nowrap">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right Section - Search Bar */}
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

