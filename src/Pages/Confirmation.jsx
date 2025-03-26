import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAppointment } from '../database';
import { generateUniqueId } from '../utils/idGenerator';
import './Confirmation.css';
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation.jsx";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notificationCounter, setNotificationCounter] = useState(0);

  useEffect(() => {
    // Get student info from localStorage
    const storedStudentInfo = localStorage.getItem('studentInfo');
    if (storedStudentInfo) {
      setStudentInfo(JSON.parse(storedStudentInfo));
    } else {
      navigate('/login');
      return;
    }

    // Get appointment details from location state
    if (location.state?.appointmentDetails) {
      setAppointmentDetails(location.state.appointmentDetails);
    } else {
      navigate('/dateandtime');
      return;
    }
  }, [location, navigate]);

  const handleSchedule = async () => {
    if (!studentInfo || !appointmentDetails) {
      setError('Missing required information');
      return;
    }

    setLoading(true);
    try {
      const result = createAppointment(
        studentInfo.studentId,
        appointmentDetails.date,
        appointmentDetails.time,
        appointmentDetails.type
      );

      if (result.success) {
        // Determine location based on appointment type
        let location = '';
        let notes = '';
        let priority = 'medium';

        if (appointmentDetails.type.includes('Hospital')) {
          location = 'KNUST Hospital, Main Campus';
          notes = 'Please bring your student ID and NHIS card. Arrive 15 minutes before your appointment time.';
          priority = 'high';
        } else if (appointmentDetails.type.includes('Student Clinic')) {
          location = 'KNUST Student Clinic';
          notes = 'Please bring your student ID and any relevant medical records. Arrive 10 minutes before your appointment time.';
          priority = 'high';
        } else if (appointmentDetails.type.includes('Counseling')) {
          location = 'KNUST Counseling Center or KNUST Wellness Center';
          notes = 'Please arrive 10 minutes before your scheduled time. Bring your student ID and any relevant documents.';
          priority = 'medium';
        } else if (appointmentDetails.type.includes('HOD')) {
          location = 'Directorate of Student Affairs (DoSA) or HOD Office';
          notes = 'Please arrive 10 minutes before your scheduled time. Bring your student ID and any relevant documents.';
          priority = 'medium';
        }

        // Create a unique key for this appointment
        const appointmentKey = generateUniqueId(result.appointment.id, appointmentDetails.type);

        // Check for existing notifications and todos
        const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        const processedAppointments = new Set(
          JSON.parse(localStorage.getItem('processedAppointments') || '[]')
        );

        // Only create notification and todo if this appointment hasn't been processed
        if (!processedAppointments.has(appointmentKey)) {
          // Create notification event with complete location information
          const notificationEvent = new CustomEvent('newAppointment', {
            detail: {
              appointmentId: result.appointment.id,
              date: appointmentDetails.date,
              time: appointmentDetails.time,
              location: location,
              notes: notes,
              type: appointmentDetails.type,
              priority: priority
            }
          });

          // Dispatch the event
          window.dispatchEvent(notificationEvent);

          // Add to todos with complete location information
          const newTodo = {
            id: result.appointment.id,
            department: appointmentDetails.type,
            duration: '30 Minute Meeting',
            date: `${appointmentDetails.date} - ${appointmentDetails.time}`,
            status: 'pending',
            bookingPage: `/${appointmentDetails.type.toLowerCase()}-booking`,
            notes: notes,
            reminder: null,
            appointmentId: result.appointment.id,
            location: location
          };
          
          const todos = [...existingTodos, newTodo];
          localStorage.setItem('todos', JSON.stringify(todos));

          // Mark this appointment as processed
          processedAppointments.add(appointmentKey);
          localStorage.setItem('processedAppointments', JSON.stringify([...processedAppointments]));
        }

        // Save appointment to localStorage for history with complete location information
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const isDuplicateAppointment = appointments.some(
          appointment => appointment.id === result.appointment.id
        );

        if (!isDuplicateAppointment) {
          appointments.push({
            ...result.appointment,
            location: location,
            notes: notes,
            priority: priority
          });
          localStorage.setItem('appointments', JSON.stringify(appointments));
        }

        // Navigate to confirmation page with complete location information
        navigate('/appointmentconfirmed', { 
          state: { 
            appointment: {
              ...result.appointment,
              location: location,
              notes: notes,
              priority: priority
            }
          } 
        });
      } else {
        setError(result.message || 'Failed to schedule appointment');
      }
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!studentInfo || !appointmentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Loading...</h2>
          <p className="mt-2">Please wait while we load your information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              User Information
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="bg-gray-200 p-3 rounded">
                    <p className="text-sm text-gray-600">Username</p>
                    <p 
                      id="username-display" 
                      name="username-display" 
                      className="font-medium text-gray-800"
                    >
                      {studentInfo.username}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="bg-gray-200 p-3 rounded">
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p 
                      id="student-id-display" 
                      name="student-id-display" 
                      className="font-medium text-gray-800"
                    >
                      {studentInfo.studentId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                id="back-button"
                name="back-button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Back
              </button>
              <button
                id="schedule-button"
                name="schedule-button"
                onClick={handleSchedule}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? 'Scheduling...' : 'Schedule Event'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
