import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
import PropTypes from "prop-types";

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
  { title: "Routine Checkups", desc: "General health assessments.", image: routineImg, path: "/routine-checkup" },
  { title: "First Aid & Minor Injury Treatment", desc: "For cuts, bruises, or mild sprains.", image: firstAidImg, path: "/first-aid" },
  { title: "Chronic Illness Management", desc: "Support for conditions like asthma, diabetes, or migraines.", image: chronicImg, path: "/chronic-illness" },
  { title: "Cold, Flu, and Fever Consultations", desc: "Quick checkups and medication recommendations.", image: fluImg, path: "/cold-flu" },
  { title: "Mental Health Screening", desc: "Assessments for anxiety, depression, or other concerns.", image: mentalHealthImg, path: "/mental-health" },
  { title: "Immunizations & Vaccinations", desc: "Flu shots, HPV vaccine, etc.", image: vaccineImg, path: "/vaccinations" },
  { title: "Laboratory Testing", desc: "Blood tests, urine tests, etc.", image: labTestImg, path: "/laboratory-testing" },
  { title: "Prescription Refills", desc: "Consultation for ongoing medications.", image: prescriptionImg, path: "/prescriptions" },
  { title: "Referrals to Specialists", desc: "For students needing advanced medical care.", image: specialistImg, path: "/specialist-referral" },
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

const StudentClinicappointments = () => {
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
      <h1 className="text-center text-xl font-bold text-blue-600 mt-8">STUDENT CLINIC APPOINTMENT</h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-center text-gray-700 mt-6 mb-10 italic">
        Your well-being matters—book your student clinic appointment today for a healthier tomorrow!
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentClinicappointments;
