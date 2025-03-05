import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
import PropTypes from "prop-types";

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
  { title: "Subject-Specific Tutoring", desc: "Help with math, physics, chemistry, computer science, etc.", image: tutoringImg, path: "/tutoring" },
  { title: "Essay Writing & Research Help", desc: "Assistance with structuring essays, citations, and thesis writing.", image: essayHelpImg, path: "/essay-help" },
  { title: "Exam Preparation Sessions", desc: "Personalized study plans and practice tests.", image: examPrepImg, path: "/exam-prep" },
  { title: "Time Management & Study Skills Coaching", desc: "Tips for better academic performance.", image: studySkillsImg, path: "/study-skills" },
  { title: "Language Support", desc: "Help with English or other languages.", image: languageSupportImg, path: "/language-support" },
  { title: "Senior Project or Thesis Guidance", desc: "Support for final-year research projects.", image: thesisGuidanceImg, path: "/thesis-guidance" },
  { title: "Academic Advising", desc: "Help in selecting courses, understanding degree requirements, and career planning.", image: academicAdvisingImg, path: "/academic-advising" },
];

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
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <button className="text-2xl">☰</button>
        <h1 className="text-sm md:text-base text-center flex-1">
          Welcome To Your DASHBOARD
        </h1>
      </nav>

      {/* Navigation Links */}
      <div className="flex justify-around py-2 bg-white shadow-md text-xs md:text-sm">
        <Link to="/dashboard" className="hover:text-blue-500 font-bold">Dashboard</Link>
        <Link to="/todo" className="hover:text-blue-500">To-do</Link>
        <Link to="/notifications" className="hover:text-blue-500">Notifications</Link>
        <Link to="/inbox" className="hover:text-blue-500">Inbox</Link>
        <Link to="/settings" className="hover:text-blue-500">Settings</Link>
      </div>

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
