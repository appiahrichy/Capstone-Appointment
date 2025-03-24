import { useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import Footer from "../Component/Footer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Image Imports
import routineImg from "../assets/images/routine_checkup.jpg";
import firstAidImg from "../assets/images/First aid.jpg";
import chronicImg from "../assets/images/Chronic illness.jpg";
import fluImg from "../assets/images/cold_flu.jpg";
import mentalHealthImg from "../assets/images/mental_health.jpg";
import vaccineImg from "../assets/images/vaccination.jpg";
import labTestImg from "../assets/images/laboratory_testing.jpg";
import prescriptionImg from "../assets/images/prescription.jpg";
import specialistImg from "../assets/images/specialist.jpg";

// Service Data
const services = [
  { title: "Routine Checkups", desc: "General health assessments.", image: routineImg, path: "/DateandTime" },
  { title: "First Aid & Minor Injury Treatment", desc: "For cuts, bruises, or mild sprains.", image: firstAidImg, path: "/DateandTime" },
  { title: "Chronic Illness Management", desc: "Support for conditions like asthma, diabetes, or migraines.", image: chronicImg, path: "/DateandTime" },
  { title: "Cold, Flu, and Fever Consultations", desc: "Quick checkups and medication recommendations.", image: fluImg, path: "/cold-flu" },
  { title: "Mental Health Screening", desc: "Assessments for anxiety, depression, or other concerns.", image: mentalHealthImg, path: "/DateandTime" },
  { title: "Immunizations & Vaccinations", desc: "Flu shots, HPV vaccine, etc.", image: vaccineImg, path: "/DateandTime" },
  { title: "Laboratory Testing", desc: "Blood tests, urine tests, etc.", image: labTestImg, path: "/DateandTime" },
  { title: "Prescription Refills", desc: "Consultation for ongoing medications.", image: prescriptionImg, path: "/DateandTime" },
  { title: "Referrals to Specialists", desc: "For students needing advanced medical care.", image: specialistImg, path: "/DateandTime" },
];

// Service Card Component
const ServiceCard = ({ title, desc, image, path }) => (
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
      className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 inline-flex items-center mt-2 group-hover:translate-x-1 transition-transform"
    >
      Book Now 
      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const StudentClinicAppointments = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Standard Navbar */}
      <Navbar />

      {/* Standard Navigation */}
      <Navigation activePath={location.pathname} />

      {/* Student Clinic Appointment Title */}
      <h2 className="text-center text-2xl font-semibold text-blue-600 mt-6 hover:text-blue-800 transition-colors duration-300">
        STUDENT CLINIC APPOINTMENT
      </h2>

      {/* Services Section */}
      <div className="flex-1 p-5 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-11/12">
          {services.map((service, index) => (
            <div key={index} className="transform hover:scale-[1.01] transition-all duration-300">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-center text-gray-700 mt-10 mb-6 text-sm hover:text-gray-800 transition-colors duration-300">
        Your health is our priority—schedule your appointment today for a healthier tomorrow.
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentClinicAppointments;
