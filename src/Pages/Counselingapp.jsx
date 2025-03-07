import { useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import ServiceCard from "../Component/Servicecard";
import Footer from "../Component/Footer";

// Import Images
import personalImg from "../assets/images/Personal_counseling.jpg";
import academicImg from "../assets/images/Academic_counseling.jpg";
import careerImg from "../assets/images/Career_counseling.jpg";
import crisisImg from "../assets/images/Crisis_couseling.jpg";
import griefImg from "../assets/images/Grief_counseling.jpg";
import substanceImg from "../assets/images/Substance_abuse.jpg";

const services = [
  { title: "Personal Counseling", description: "For stress, anxiety, or depression.", image: personalImg, path: "/DateandTime" },
  { title: "Academic Counseling", description: "Help with managing coursework and study stress.", image: academicImg, path: "/DateandTime" },
  { title: "Career Counseling", description: "Guidance on career planning and job search.", image: careerImg, path: "/DateandTime" },
  { title: "Crisis Counseling", description: "Immediate support for urgent emotional or mental health crises.", image: crisisImg, path: "/DateandTime" },
  { title: "Grief Counseling", description: "Support for coping with loss.", image: griefImg, path: "/DateandTime" },
  { title: "Substance Abuse Counseling", description: "Help with addiction and recovery.", image: substanceImg, path: "/DateandTime" },
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
      <h2 className="text-center text-lg font-semibold text-blue-600 mt-6">
        COUNSELING APPOINTMENT
      </h2>

      {/* Services Section */}
      <div className="flex-1 p-5 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-11/12">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-center text-gray-700 mt-10 mb-6 text-sm">
        Your mind matters—take the first step toward healing by booking your appointment today.
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CounselingDashboard;
