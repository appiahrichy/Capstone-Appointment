import { useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation.jsx";
import Footer from "../Component/Footer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Image Imports (Ensure filenames are correct and without spaces)
import curriculumImg from "../assets/images/Curriculum.jpg";
import researchImg from "../assets/images/Research.jpg";
import performanceImg from "../assets/images/Performance.jpg";
import workloadImg from "../assets/images/Workload.jpg";
import resourceImg from "../assets/images/Resource.jpg";
import gradingImg from "../assets/images/Examination.jpg";
import promotionImg from "../assets/images/Promotion.jpg";
import conferenceImg from "../assets/images/Conference.jpg";
import leadershipImg from "../assets/images/Committee.jpg";

// Appointment Categories
const appointments = [
  { title: "Curriculum Development", desc: "Discussing course updates, syllabus revisions, or new teaching methodologies.", image: curriculumImg, path: "/DateandTime" },
  { title: "Research Collaboration", desc: "Seeking guidance or approval for research projects, funding, or publications.", image: researchImg, path: "/research" },
  { title: "Student Performance & Issues", desc: "Addressing concerns about struggling students, plagiarism cases, or disciplinary matters.", image: performanceImg, path: "/DateandTime" },
  { title: "Workload & Teaching Schedule", desc: "Requesting changes to lecture hours, reassignments, or additional responsibilities.", image: workloadImg, path: "/DateandTime" },
  { title: "Resource Allocation", desc: "Discussing the need for lab equipment, textbooks, or better facilities.", image: resourceImg, path: "/resource-allocation" },
  { title: "Examination & Grading Issues", desc: "Clarifying grading policies, handling exam misconduct cases, or planning assessments.", image: gradingImg, path: "/DateandTime" },
  { title: "Promotion & Appraisals", desc: "Meeting to discuss career progression, evaluations, or faculty development plans.", image: promotionImg, path: "/DateandTime" },
  { title: "Conference & Leave Approvals", desc: "Seeking permission to attend academic conferences, workshops, or apply for sabbaticals.", image: conferenceImg, path: "/DateandTime" },
  { title: "Committee & Leadership Roles", desc: "Discussing potential leadership positions or responsibilities within the department.", image: leadershipImg, path: "/DateandTime" },
];

// Appointment Card Component
const AppointmentCard = ({ title, desc, image, path }) => (
  <div className="border border-blue-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 bg-white overflow-hidden p-5 text-center transform hover:scale-[1.02] group">
    <img 
      src={image} 
      alt={title} 
      className="w-20 h-20 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" 
    />
    <h3 className="font-semibold text-lg text-blue-600 group-hover:text-blue-800 transition-colors">{title}</h3>
    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{desc}</p>
    <Link 
      to={path} 
      className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-200 inline-flex items-center mt-2 group-hover:translate-x-1"
    >
      Book Now 
      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

AppointmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const HODAppointment = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Navigation activePath={location.pathname} />
      
      <div className="flex-grow">
        <h2 className="text-center text-2xl font-semibold text-blue-600 mt-6 hover:text-blue-800 transition-colors duration-300">
          HOD APPOINTMENT
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
          {appointments.map((appointment, index) => (
            <div key={index} className="transform hover:scale-[1.01] transition-all duration-300">
              <AppointmentCard {...appointment} />
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-700 mt-6 mb-20 italic hover:text-gray-800 transition-colors duration-300">
          Your academic and professional growth matter—schedule a meeting with your HOD today for a smoother and more productive journey!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default HODAppointment;
