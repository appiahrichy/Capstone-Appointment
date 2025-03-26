import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import Footer from "../Component/Footer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { memo } from "react";

// Image Imports
import tutoringImg from "../assets/images/tutoring.jpg";
import essayHelpImg from "../assets/images/essay_help.jpg";
import examPrepImg from "../assets/images/exam_prep.jpg";
import studySkillsImg from "../assets/images/study_skills.jpg";
import languageSupportImg from "../assets/images/Language support.jpg";
import thesisGuidanceImg from "../assets/images/thesis_guidance.jpg";
import academicAdvisingImg from "../assets/images/Academic advising.jpg";

// Service Data
const services = [
  { title: "Subject-Specific Tutoring", desc: "Help with math, physics, chemistry, computer science, etc.", image: tutoringImg, path: "/DateandTime", type: "Subject Tutoring" },
  { title: "Essay Writing & Research Help", desc: "Assistance with structuring essays, citations, and thesis writing.", image: essayHelpImg, path: "/DateandTime", type: "Essay Writing" },
  { title: "Exam Preparation Sessions", desc: "Personalized study plans and practice tests.", image: examPrepImg, path: "/DateandTime", type: "Exam Preparation" },
  { title: "Time Management & Study Skills Coaching", desc: "Tips for better academic performance.", image: studySkillsImg, path: "/DateandTime", type: "Study Skills" },
  { title: "Language Support", desc: "Help with English or other languages.", image: languageSupportImg, path: "/DateandTime", type: "Language Support" },
  { title: "Senior Project or Thesis Guidance", desc: "Support for final-year research projects.", image: thesisGuidanceImg, path: "/DateandTime", type: "Thesis Guidance" },
  { title: "Academic Advising", desc: "Help in selecting courses, understanding degree requirements, and career planning.", image: academicAdvisingImg, path: "/DateandTime", type: "Academic Advising" },
];

// Service Card Component
const ServiceCard = ({ title, desc, image, path, type }) => {
  const navigate = useNavigate();

  const handleBookNow = useCallback(() => {
    // Prevent multiple clicks
    const button = document.getElementById(`book-btn-${title.toLowerCase().replace(/\s+/g, '-')}`);
    if (button) {
      button.disabled = true;
      button.classList.add('opacity-50', 'cursor-not-allowed');
    }

    // Navigate with state
    navigate(path, { 
      state: { 
        type: type,
        from: 'academic',
        title: title
      },
      replace: true // Replace current history entry instead of adding new one
    });
  }, [navigate, path, type, title]);

  return (
    <div className="border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-20 h-20 mx-auto mb-4" />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
      <button 
        onClick={handleBookNow}
        className="text-blue-500 font-semibold mt-2 inline-block hover:underline transition-all duration-200"
        aria-label={`Book appointment for ${title}`}
        id={`book-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
        name={`book-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        Book Now →
      </button>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

// Memoize the ServiceCard component
const MemoizedServiceCard = memo(ServiceCard);

const AcademicAdvisorAppointments = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the services array
  const memoizedServices = useMemo(() => services, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Standard Navbar */}
      <Navbar />

      {/* Standard Navigation */}
      <Navigation activePath={location.pathname} />

      {/* Page Title */}
      <h1 className="text-center text-xl font-bold text-blue-600 mt-8">ACADEMIC ADVISOR APPOINTMENT</h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
        {memoizedServices.map((service, index) => (
          <MemoizedServiceCard 
            key={`${service.type}-${index}`} 
            {...service} 
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-center text-gray-700 mt-6 mb-10 italic">
        Your future starts with the right guidance—schedule your academic advising appointment today!
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AcademicAdvisorAppointments;
