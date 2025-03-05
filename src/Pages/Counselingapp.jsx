import { Link } from "react-router-dom";
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
  { title: "Personal Counseling", description: "For stress, anxiety, or depression.", image: personalImg, path: "/personal_counseling" },
  { title: "Academic Counseling", description: "Help with managing coursework and study stress.", image: academicImg, path: "/academic_counseling" },
  { title: "Career Counseling", description: "Guidance on career planning and job search.", image: careerImg, path: "/career_counseling" },
  { title: "Crisis Counseling", description: "Immediate support for urgent emotional or mental health crises.", image: crisisImg, path: "/crisis_counseling" },
  { title: "Grief Counseling", description: "Support for coping with loss.", image: griefImg, path: "/grief_counseling" },
  { title: "Substance Abuse Counseling", description: "Help with addiction and recovery.", image: substanceImg, path: "/substance_abuse" },
];

const CounselingDashboard = () => {
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
