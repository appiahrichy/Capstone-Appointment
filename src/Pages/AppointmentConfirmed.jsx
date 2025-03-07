import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "../Component/Navbar"; // Importing the Navbar
import Navigation from "../Component/Navigation"; // Importing the Navigation

const AppointmentConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Navigation Links */}
      <Navigation />

      {/* Confirmation Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-lg p-10 rounded-lg border border-blue-400 text-center w-96">
          <h2 className="text-xl font-mono">Hospital Appointment</h2>
          <div className="flex justify-center my-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>
          <p className="text-gray-700">Appointment Confirmed</p>
          <div className="mt-4">
            <Link
              to="/appointment-details"
              className="px-4 py-2 text-blue-600 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
