
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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="bg-white shadow-lg p-6 sm:p-8 md:p-10 rounded-lg border border-blue-400 text-center w-full max-w-sm sm:max-w-md md:w-96">
          <h2 className="text-lg sm:text-xl font-mono">Hospital Appointment</h2>
          <div className="flex justify-center my-4">
            <CheckCircle className="text-green-500 w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <p className="text-gray-700 text-sm sm:text-base">Appointment Confirmed</p>
          <div className="mt-4">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
