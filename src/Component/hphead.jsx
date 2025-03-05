import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa"; // For icons

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Menu Icon */}
        <button className="text-white text-lg md:hidden">
          <FaBars />
        </button>

        {/* Center - Title */}
        <h1 className="text-sm md:text-lg font-semibold mx-auto">Welcome To Your DASHBOARD</h1>

        {/* Right - Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-8 rounded-md text-black border border-gray-300"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex justify-center mt-3 space-x-6 text-sm">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/todo" className="hover:underline">To-do</Link>
        <Link to="/notifications" className="hover:underline">Notifications</Link>
        <Link to="/inbox" className="hover:underline">Inbox</Link>
        <Link to="/settings" className="hover:underline">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
