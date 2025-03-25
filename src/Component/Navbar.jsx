import { Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Get the current path to determine where to search
    const currentPath = location.pathname;
    
    // Store the search query in localStorage for the target component to use
    localStorage.setItem('globalSearchQuery', searchQuery);
    
    // Navigate to the appropriate page based on the current location
    if (currentPath.includes('dashboard')) {
      navigate('/todo'); // Search in todo items
    } else if (currentPath.includes('inbox')) {
      // Already on inbox page, just update the search
      window.location.reload();
    } else if (currentPath.includes('todo')) {
      // Already on todo page, just update the search
      window.location.reload();
    } else {
      // Default to todo page for search
      navigate('/todo');
    }
  }, [searchQuery, location.pathname, navigate]);

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
      <form onSubmit={handleSearch} className="relative w-20 sm:w-28 md:w-36 lg:w-48">
        <input
          type="search"
          id="navbar-search"
          name="navbar-search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          autoComplete="off"
          aria-label="Search"
          className="w-full px-2 py-1 pl-7 rounded-full border border-gray-300 text-black bg-white text-xs sm:text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
          aria-label="Search"
          title="Search"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </form>
      
    </nav>
  );
};

export default Navbar;

