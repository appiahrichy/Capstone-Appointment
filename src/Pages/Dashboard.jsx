import { Link, useLocation } from "react-router-dom";
import { useState } from "react"; // Added useState
import Footer from "../Component/Footer";
import PropTypes from "prop-types";
import studentClinicImg from "../assets/images/student_clinic.jpg";
import hospitalImg from "../assets/images/Hospital.jpg";
import counselingImg from "../assets/images/counseling.jpg";
import hodImg from "../assets/images/hod.jpg";
import { Search } from "lucide-react"; // Search Icon

const services = [
  { title: "Student Clinic", image: studentClinicImg, path: "/Studentclinicapp" },
  { title: "Hospital", image: hospitalImg, path: "/Hospitalapp" },
  { title: "Counseling Center", image: counselingImg, path: "/Counselingapp" },
  { title: "HOD", image: hodImg, path: "/hod" },
];

const ServiceCard = ({ title, image, path }) => {
  return (
    <Link to={path} className="block w-full">
      <div className="flex border border-blue-400 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white overflow-hidden items-stretch">
        {/* Left Side - Title */}
        <div className="w-1/3 flex items-center justify-center p-4 text-lg font-semibold text-blue-600 border-r border-blue-400">
          {title}
        </div>

        {/* Right Side - Image */}
        <div className="w-2/3 flex-grow flex items-center justify-center bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

// PropTypes validation
ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Fixed missing useState

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <button className="text-2xl">☰</button>
        <h1 className="text-sm md:text-base text-center flex-1">
          Welcome To Your DASHBOARD
        </h1>

        {/* Search Bar (Right) */}
        <div className="relative w-40 md:w-52">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-1 rounded-full border border-gray-300 text-black text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>
      </nav>

      {/* Navigation Links */}
      <div className="flex justify-around py-2 bg-white shadow-md text-xs md:text-sm">
        <Link
          to="/dashboard"
          className={`hover:text-blue-500 ${
            location.pathname === "/dashboard" ? "text-blue-600 font-bold" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link to="/todo" className="hover:text-blue-500">To-do</Link>
        <Link to="/notifications" className="hover:text-blue-500">Notifications</Link>
        <Link to="/inbox" className="hover:text-blue-500">Inbox</Link>
        <Link to="/settings" className="hover:text-blue-500">Settings</Link>
      </div>

      {/* Services Section */}
      <div className="flex-1 p-1 mt-9 grid grid-cols-1 gap-7 mx-auto max-w-6xl w-11/12">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
