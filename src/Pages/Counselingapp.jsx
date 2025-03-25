import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import Footer from "../Component/Footer";
import PropTypes from "prop-types";

// Import Images
import personalImg from "../assets/images/Personal_counseling.jpg";
import academicImg from "../assets/images/Academic_counseling.jpg";
import careerImg from "../assets/images/Career_counseling.jpg";
import crisisImg from "../assets/images/Crisis_couseling.jpg";
import griefImg from "../assets/images/Grief_counseling.jpg";
import substanceImg from "../assets/images/Substance_abuse.jpg";

const services = [
  { title: "Personal Counseling", description: "For stress, anxiety, or depression.", image: personalImg, path: "/DateandTime", type: "Personal Counseling" },
  { title: "Academic Counseling", description: "Help with managing coursework and study stress.", image: academicImg, path: "/DateandTime", type: "Academic Counseling" },
  { title: "Career Counseling", description: "Guidance on career planning and job search.", image: careerImg, path: "/DateandTime", type: "Career Counseling" },
  { title: "Crisis Counseling", description: "Immediate support for urgent emotional or mental health crises.", image: crisisImg, path: "/DateandTime", type: "Crisis Counseling" },
  { title: "Grief Counseling", description: "Support for coping with loss.", image: griefImg, path: "/DateandTime", type: "Grief Counseling" },
  { title: "Substance Abuse Counseling", description: "Help with addiction and recovery.", image: substanceImg, path: "/DateandTime", type: "Substance Abuse Counseling" },
];

const CounselingDashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Standard Navbar */}
      <Navbar />

      {/* Standard Navigation */}
      <Navigation activePath={location.pathname} />

      {/* Counseling Appointment Title */}
      <h2 className="text-center text-2xl font-semibold text-blue-600 mt-6 hover:text-blue-800 transition-colors duration-300">
        COUNSELING APPOINTMENT
      </h2>

      {/* Services Section */}
      <div className="flex-1 p-5 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-11/12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-center text-gray-700 mt-10 mb-6 text-sm hover:text-gray-800 transition-colors duration-300">
        Your mind matters—take the first step toward healing by booking your appointment today.
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ title, description, image, path, type }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    console.log('ServiceCard: Navigating with type:', type);
    navigate(path, { 
      state: { 
        type: type 
      }
    });
  };

  return (
    <div className="border border-blue-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 bg-white overflow-hidden p-5 text-center transform hover:scale-[1.02] group" role="article" aria-labelledby={`service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <img 
        src={image} 
        alt={title} 
        className="w-20 h-20 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" 
      />
      <h3 id={`service-title-${title.toLowerCase().replace(/\s+/g, '-')}`} className="font-semibold text-lg text-blue-600 group-hover:text-blue-800 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{description}</p>
      <button 
        onClick={handleBookNow}
        className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-200 inline-flex items-center mt-2 group-hover:translate-x-1"
        aria-label={`Book appointment for ${title}`}
        id={`book-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
        name={`book-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        Book Now 
        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CounselingDashboard;
