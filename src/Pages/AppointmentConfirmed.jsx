import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from "../Component/Navbar"; // Importing the Navbar
import Navigation from "../Component/Navigation"; // Importing the Navigation

const AppointmentConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;
  const userType = localStorage.getItem('userType'); // Get user type from localStorage

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2">No appointment details found. Please try booking again.</p>
        </div>
      </div>
    );
  }

  const handleDashboardNavigation = () => {
    if (userType === 'student') {
      navigate('/studentdashboard');
    } else if (userType === 'staff') {
      navigate('/dashboard');
    } else {
      navigate('/studentorstaff');
    }
  };

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

      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium">{appointment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{appointment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time:</span>
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Staff:</span>
                <span className="font-medium">{appointment.staffName}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-blue-800">Important Information</h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Please arrive 5 minutes before your scheduled time</li>
              <li>• Bring your student ID for verification</li>
              <li>• You will receive a reminder notification 24 hours before your appointment</li>
              <li>• If you need to reschedule, please do so at least 24 hours in advance</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleDashboardNavigation}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmed;
