import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Standard Navbar */}
      <Navbar />

      {/* Standard Navigation */}
      <Navigation activePath={location.pathname} />

      {/* Confirmation Section */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
          Confirm your details
        </h2>

        <div className="border border-blue-400 rounded-lg shadow-md p-6 mt-6 w-full max-w-md">
          <Link to="/DateandTime" className="inline-block mb-4">
            <ArrowLeft className="text-blue-500" />
          </Link>

          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value="capstone@knust.edu.gh"
              disabled
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Student ID</label>
            <input
              type="text"
              value="1234566756"
              disabled
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>

          <p className="text-sm">30 min</p>
          <p className="text-sm">Web conferencing details provided upon confirmation.</p>
          <p className="text-sm mt-2">09:00 - 09:30, Thursday, February 13, 2025</p>
          <p className="text-sm">UTC Time</p>

          {/* Fixed Link tag */}
          <Link to="/AppointmentConfirmed">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
              Schedule Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
