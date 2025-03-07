import { useLocation } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation"; // Standard Navigation
import PropTypes from "prop-types";
import studentClinicImg from "../assets/images/student_clinic.jpg";
import hospitalImg from "../assets/images/Hospital.jpg";
import counselingImg from "../assets/images/counseling.jpg";
import hodImg from "../assets/images/hod.jpg";

const services = [
  { title: "Student Clinic", image: studentClinicImg, path: "/Studentclinicapp" },
  { title: "Hospital", image: hospitalImg, path: "/Hospitalapp" },
  { title: "Counseling Center", image: counselingImg, path: "/Counselingapp" },
  { title: "HOD", image: hodImg, path: "/hod" },
];

const ServiceCard = ({ title, image, path }) => {
  return (
    <a href={path} className="block w-full">
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
    </a>
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Standard Navbar */}
      <Navbar />

      {/* Standard Navigation */}
      <Navigation activePath={location.pathname} />

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
