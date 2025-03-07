import { useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import Footer from "../Component/Footer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
  { title: "Subject-Specific Tutoring", desc: "Help with math, physics, chemistry, computer science, etc.", image: tutoringImg, path: "/DateandTime" },
  { title: "Essay Writing & Research Help", desc: "Assistance with structuring essays, citations, and thesis writing.", image: essayHelpImg, path: "/DateandTime" },
  { title: "Exam Preparation Sessions", desc: "Personalized study plans and practice tests.", image: examPrepImg, path: "/DateandTime" },
  { title: "Time Management & Study Skills Coaching", desc: "Tips for better academic performance.", image: studySkillsImg, path: "/DateandTime" },
  { title: "Language Support", desc: "Help with English or other languages.", image: languageSupportImg, path: "/DateandTime" },
  { title: "Senior Project or Thesis Guidance", desc: "Support for final-year research projects.", image: thesisGuidanceImg, path: "/DateandTime" },
  { title: "Academic Advising", desc: "Help in selecting courses, understanding degree requirements, and career planning.", image: academicAdvisingImg, path: "/DateandTime" },
];

// Service Card Component
const ServiceCard = ({ title, desc, image, path }) => (
  <div className="border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300">
    <img src={image} alt={title} className="w-20 h-20 mx-auto mb-4" />
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
    <Link to={path} className="text-blue-500 font-semibold mt-2 inline-block hover:underline">
      Book Now →
    </Link>
  </div>
);

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const AcademicAdvisorAppointments = () => {
  const location = useLocation();

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
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
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
