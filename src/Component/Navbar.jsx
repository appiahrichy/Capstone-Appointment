import { Menu } from "lucide-react"; // For the hamburger icon

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex items-center justify-between">
      {/* Left - Menu Icon */}
      <button className="text-white text-2xl">
        <Menu />
      </button>

      {/* Center - Dashboard Text */}
      <h1 className="text-lg font-semibold">Welcome To Your DASHBOARD</h1>

      {/* Right - Search Input */}
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

