import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, User, Bell } from 'lucide-react';
import Navbar from "../Component/Navbar"; // Importing the Navbar
import Navigation from "../Component/Navigation"; // Importing the Navigation

const AppointmentConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;
  const userType = localStorage.getItem('userType'); // Get user type from localStorage
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setShowAnimation(true);
  }, []);

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

  // Get appointment type-specific information
  const getAppointmentInfo = () => {
    const type = appointment.type.toLowerCase();
    if (type.includes('hospital')) {
      return {
        title: 'Hospital Appointment',
        location: 'KNUST Hospital',
        instructions: [
          'Please arrive 15 minutes before your scheduled time',
          'Bring your student ID and NHIS card',
          'Wear appropriate clothing for medical examination',
          'Bring any relevant medical records or test results'
        ]
      };
    } else if (type.includes('clinic')) {
      return {
        title: 'Student Clinic Appointment',
        location: 'KNUST Student Clinic',
        instructions: [
          'Please arrive 10 minutes before your scheduled time',
          'Bring your student ID and any relevant medical records',
          'Wear comfortable clothing for examination',
          'Bring any medications you are currently taking'
        ]
      };
    } else if (type.includes('counseling')) {
      return {
        title: 'Counseling Center Appointment',
        location: type.includes('department') ? 'Department Counseling Room' : 'J. Harper Building',
        instructions: [
          'Please arrive 10 minutes before your scheduled time',
          'Bring your student ID',
          'Come prepared with any questions or concerns',
          'Maintain confidentiality of your session'
        ]
      };
    } else if (type.includes('academic')) {
      return {
        title: 'Academic Advisor Appointment',
        location: "HOD's Office",
        instructions: [
          'Please arrive 10 minutes before your scheduled time',
          'Bring your student ID and academic records',
          'Prepare your questions or concerns',
          'Bring any relevant documents for discussion'
        ]
      };
    }
    return {
      title: 'Appointment',
      location: 'KNUST Campus',
      instructions: [
        'Please arrive 5 minutes before your scheduled time',
        'Bring your student ID for verification',
        'You will receive a reminder notification 24 hours before your appointment',
        'If you need to reschedule, please do so at least 24 hours in advance'
      ]
    };
  };

  const appointmentInfo = getAppointmentInfo();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Navigation Links */}
      <Navigation />

      {/* Confirmation Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
        <div className={`bg-white shadow-xl p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-blue-400 text-center w-full max-w-md transform transition-all duration-500 ${showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">{appointmentInfo.title}</h2>
          
          <div className="flex justify-center my-6">
            <div className={`transform transition-all duration-500 ${showAnimation ? 'scale-100' : 'scale-0'}`}>
              <CheckCircle className="text-green-500 w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Calendar className="w-5 h-5" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span>{appointmentInfo.location}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <User className="w-5 h-5" />
              <span>{appointment.staffName}</span>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center justify-center">
              <Bell className="w-5 h-5 mr-2" />
              Important Information
            </h4>
            <ul className="text-sm text-blue-700 space-y-3">
              {appointmentInfo.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={handleDashboardNavigation}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
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
