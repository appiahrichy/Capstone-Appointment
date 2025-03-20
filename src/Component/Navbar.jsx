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
    <nav className="bg-blue-500 text-white p-4 flex items-center justify-between h-20">
      {/* Large Logo on the Left */}
      <div className="flex flex-1 justify-start">
      <Link to="/">
      <img src={logo} alt="Logo" className="h-8 w-8 object-contain col-auto opacity-70" />

        </Link>
      </div>

      {/* Page Title in the Center */}
      <div className="flex flex-1 justify-center">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
      </div>
{/* Search Bar on the Right */}
<div className="flex flex-1 justify-end">
  <div className="relative">
    <input
      type="text"
      placeholder="Search"
      className="px-3 py-2 pl-10 rounded-full border border-gray-300 text-black w-52 bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
  </div>
</div>

    </nav>
  );
};

export default Navbar;
