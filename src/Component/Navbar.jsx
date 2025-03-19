import { Menu } from "lucide-react"; // For the hamburger icon
import { useLocation } from "react-router-dom";

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
    <nav className="bg-blue-500 text-white p-4 flex items-center justify-between">
      <button className="text-white text-2xl">
        <Menu />
      </button>
      <h1 className="text-lg">{getPageTitle()}</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1 rounded-md border border-gray-300 text-black"
        />
      </div>
    </nav>
  );
};

export default Navbar;
