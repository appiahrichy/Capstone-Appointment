import { Link } from "react-router-dom";
import ServiceCard from "../Component/Servicecard";
import Footer from "../Component/Footer";

// Import Images
import gpImg from "../assets/images/general_practitioner.jpg";
import physioImg from "../assets/images/Physiotherapy.jpg";
import dentalImg from "../assets/images/Dental Checkups.jpg";
import optometryImg from "../assets/images/Optometry.jpg";
import sexualHealthImg from "../assets/images/sexual_health.jpg";
import allergyImg from "../assets/images/allergy_testing.jpg";
const services = [
    { title: "General Practitioner Consultation", desc: "For general health concerns.", image: gpImg, path: "/gp-consultation" },
    { title: "Physiotherapy", desc: "For injuries or chronic pain.", image: physioImg, path: "/physiotherapy" },
    { title: "Dental Checkups", desc: "Routine dental care and treatments.", image: dentalImg, path: "/dental-checkup" },
    { title: "Optometry", desc: "Vision tests and eye care.", image: optometryImg, path: "/optometry" },
    { title: "Sexual Health Services", desc: "For STI testing, contraception advice, etc.", image: sexualHealthImg, path: "/sexual-health" },
    { title: "Allergy Testing", desc: "For managing allergies.", image: allergyImg, path: "/allergy-testing" },
];

const HospitalDashboard = () => {
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
        HOSPITAL APPOINTMENT
      </h2>

      {/* Services Section */}
      <div className="flex-1 p-5 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-11/12">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-center text-gray-700 mt-10 mb-6 text-sm">
      Your health is your greatest wealth—schedule your appointment today for a better tomorrow.
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HospitalDashboard;
