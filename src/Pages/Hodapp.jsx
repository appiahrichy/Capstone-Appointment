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
  <div className="border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300">
    <img src={image} alt={title} className="w-20 h-20 mx-auto mb-4" />
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
    <Link to={path} className="text-blue-500 font-semibold mt-2 inline-block hover:underline">
      Book Now →
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigation activePath={location.pathname} />
      
      <div className="flex-grow">
        <h1 className="text-center text-xl font-bold text-blue-600 mt-8">HOD APPOINTMENT</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} {...appointment} />
          ))}
        </div>
        
        <p className="text-center text-gray-700 mt-6 mb-20 italic">
          Your academic and professional growth matter—schedule a meeting with your HOD today for a smoother and more productive journey!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default HODAppointment;
