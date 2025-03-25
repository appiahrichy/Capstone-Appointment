import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
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
    { title: "General Practitioner Consultation", desc: "For general health concerns.", image: gpImg, path: "/DateandTime", type: "General Practitioner" },
    { title: "Physiotherapy", desc: "For injuries or chronic pain.", image: physioImg, path: "/DateandTime", type: "Physiotherapy" },
    { title: "Dental Checkups", desc: "Routine dental care and treatments.", image: dentalImg, path: "/DateandTime", type: "Dental" },
    { title: "Optometry", desc: "Vision tests and eye care.", image: optometryImg, path: "/DateandTime", type: "Optometry" },
    { title: "Sexual Health Services", desc: "For STI testing, contraception advice, etc.", image: sexualHealthImg, path: "/DateandTime", type: "Sexual Health" },
    { title: "Allergy Testing", desc: "For managing allergies.", image: allergyImg, path: "/DateandTime", type: "Allergy Testing" },
];

const HospitalDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    console.log('Navigating with service type:', service.type);
    navigate(service.path, { 
      state: { 
        type: service.type 
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Standard Navbar */}
      <Navbar />

      {/* Standard Navigation */}
      <Navigation activePath={location.pathname} />

      {/* Hospital Appointment Title */}
      <h2 className="text-center text-lg font-semibold text-blue-600 mt-6">
        HOSPITAL APPOINTMENT
      </h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.desc}</p>
            <button
              onClick={() => handleBookNow(service)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
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
