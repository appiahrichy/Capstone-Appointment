import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar"; // ✅ Imported Navbar
import Navigation from "../Component/Navigation"; // ✅ Imported Navigation
import PropTypes from "prop-types";
import { useState, useEffect, useMemo, memo } from 'react';
import { useLanguage } from '../context/useLanguage';
import studentClinicImg from "../assets/images/Student_clinic.jpg";
import hospitalImg from "../assets/images/Hospital.jpg";
import counselingImg from "../assets/images/Counseling.jpg";
import hodImg from "../assets/images/hod.jpg";

// Service Data - Moved outside component to prevent recreation
const services = [
  { title: "Student Clinic", image: studentClinicImg, path: "/Studentclinicapp" },
  { title: "Hospital", image: hospitalImg, path: "/Hospitalapp" },
  { title: "Counseling Center", image: counselingImg, path: "/Counselingapp" },
  { title: "HOD", image: hodImg, path: "/Hodapp" },
];

// Memoized Service Card Component
const ServiceCard = memo(({ title, image, path }) => {
  return (
    <Link to={path} className="block w-full">
      <div className="flex border border-blue-400 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white overflow-hidden">
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
            loading="lazy" // Add lazy loading for images
          />
        </div>
      </div>
    </Link>
  );
});

// PropTypes validation
ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const { currentLanguage, setCurrentLanguage, translate } = useLanguage();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [userData, setUserData] = useState(null);

  // Memoized handlers
  const handleThemeChange = useMemo(() => (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  const handleLanguageChange = useMemo(() => (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  }, [setCurrentLanguage]);

  const handleLogout = useMemo(() => () => {
    localStorage.removeItem('staffInfo');
    localStorage.removeItem('userType');
    navigate('/stafflogin');
  }, [navigate]);

  const handleChangeUser = useMemo(() => () => {
    localStorage.removeItem('staffInfo');
    localStorage.removeItem('userType');
    navigate('/StudentorStaff');
  }, [navigate]);

  // Optimized useEffect with cleanup
  useEffect(() => {
    const staffInfo = localStorage.getItem('staffInfo');
    const userType = localStorage.getItem('userType');
    
    if (staffInfo && userType === 'staff') {
      try {
        setUserData(JSON.parse(staffInfo));
      } catch (error) {
        console.error('Error parsing staff info:', error);
        navigate('/stafflogin');
      }
    } else {
      navigate('/stafflogin');
    }

    // Cleanup function
    return () => {
      setUserData(null);
    };
  }, [navigate]);

  // Memoized services grid
  const servicesGrid = useMemo(() => (
    <div className="flex-1 p-4 mt-6 grid grid-cols-1 gap-7 mx-auto max-w-6xl w-11/12">
      {services.map((service, index) => (
        <ServiceCard key={service.path} {...service} />
      ))}
    </div>
  ), []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar /> 

      {/* Navigation Links */}
      <Navigation /> 

      {/* Services Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Available Services</h1>
          <Link
            to="/settings"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Settings
          </Link>
        </div>
        {servicesGrid}
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default memo(Dashboard);
