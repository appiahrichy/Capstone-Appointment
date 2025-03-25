import { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineBell, AiOutlineCheckCircle, AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation";

// Constants for better maintainability
const LOCATION_MAPPING = {
  Hospital: "KNUST Hospital, Main Campus",
  "Student Clinic": "KNUST Student Clinic",
  Counseling: "KNUST Counseling Center or KNUST Wellness Center",
  HOD: "Directorate of Student Affairs (DoSA) or HOD Office"
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [tempNotifications, setTempNotifications] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  // Memoized function to get location based on type
  const getLocation = useCallback((type) => {
    return LOCATION_MAPPING[type] || "Not specified";
  }, []);

  // Memoized function to create notification object
  const createNotification = useCallback((data, type = "appointment") => {
    const location = getLocation(data.type);
    return {
      id: data.id || Date.now(),
      title: type === "reminder" ? "Upcoming Appointment Reminder" : "New Appointment Created",
      date: data.date,
      time: data.time,
      location,
      notes: type === "reminder" 
        ? `Reminder: You have an appointment scheduled for ${data.date} at ${data.time}. Please arrive at ${location} 15 minutes before your scheduled time.`
        : `Your appointment is scheduled at ${location}. Please arrive 15 minutes before your scheduled time.`,
      read: false,
      priority: data.priority || "high",
      type,
      appointmentId: data.id || data.appointmentId
    };
  }, [getLocation]);

  // Load notifications and appointments
  useEffect(() => {
    const loadData = () => {
      // Load notifications
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }

      // Load appointments
      const savedAppointments = localStorage.getItem('appointments');
      if (savedAppointments) {
        const appointments = JSON.parse(savedAppointments);
        const appointmentNotifications = appointments.map(appointment => 
          createNotification(appointment)
        );
        
        setNotifications(prev => {
          const updated = [...appointmentNotifications, ...prev];
          localStorage.setItem('notifications', JSON.stringify(updated));
          return updated;
        });
      }
    };

    loadData();
  }, [createNotification]);

  // Handle new appointments
  useEffect(() => {
    const handleNewAppointment = (event) => {
      const newNotification = createNotification(event.detail);
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('notifications', JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('newAppointment', handleNewAppointment);
    return () => window.removeEventListener('newAppointment', handleNewAppointment);
  }, [createNotification]);

  // Check for upcoming appointments
  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = new Date();
      const newReminders = notifications
        .filter(notification => notification.type === "appointment")
        .reduce((acc, notification) => {
          const appointmentDate = new Date(`${notification.date} ${notification.time}`);
          const timeDiff = appointmentDate - now;
          
          if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000) {
            acc.push(createNotification(notification, "reminder"));
          }
          return acc;
        }, []);

      if (newReminders.length > 0) {
        setNotifications(prev => {
          const updated = [...newReminders, ...prev];
          localStorage.setItem('notifications', JSON.stringify(updated));
          return updated;
        });
      }
    };

    const interval = setInterval(checkUpcomingAppointments, 60 * 60 * 1000);
    checkUpcomingAppointments();
    return () => clearInterval(interval);
  }, [notifications, createNotification]);

  // Memoized notification actions
  const dismissNotification = useCallback((id) => {
    setNotifications(prev => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => {
      const updated = prev.map((n) => 
        n.id === id ? { ...n, read: true } : n
      );
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setTempNotifications(notifications);
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
    const timeout = setTimeout(() => {
      setTempNotifications(null);
    }, 10000);
    setUndoTimeout(timeout);
  }, [notifications]);

  const undoClear = useCallback(() => {
    if (tempNotifications) {
      setNotifications(tempNotifications);
      localStorage.setItem('notifications', JSON.stringify(tempNotifications));
      setTempNotifications(null);
      clearTimeout(undoTimeout);
    }
  }, [tempNotifications, undoTimeout]);

  // Memoized sorted notifications
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
    });
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Notifications</h2>
          {sortedNotifications.length === 0 ? (
            <div className="text-center py-8">
              <AiOutlineBell className="mx-auto text-6xl text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No new notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white p-4 rounded-lg border-l-4 shadow-md transition-all duration-200 hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 ${
                    notification.priority === "high" 
                      ? "border-red-500" 
                      : notification.priority === "medium"
                      ? "border-yellow-500"
                      : "border-green-500"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AiOutlineBell 
                          className={`transition-colors duration-200 ${
                            notification.read ? "text-gray-400" : "text-blue-500"
                          }`}
                          size={20} 
                        />
                        <h3 className={`font-semibold transition-colors duration-200 ${
                          notification.read ? "text-gray-400" : "text-gray-800"
                        }`}>
                          {notification.title}
                          {notification.priority === "high" && (
                            <AiOutlineStar className="inline ml-2 text-red-500" />
                          )}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 ml-7">
                        <p><span className="font-medium">Date:</span> {notification.date}</p>
                        <p><span className="font-medium">Time:</span> {notification.time}</p>
                        <p><span className="font-medium">Location:</span> {notification.location}</p>
                        <p><span className="font-medium">Priority:</span> {notification.priority}</p>
                      </div>
                      <p className="text-gray-700 mt-2 ml-7">
                        <span className="font-medium">Notes:</span> {notification.notes}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                      >
                        <AiOutlineDelete /> Dismiss
                      </button>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                      >
                        <AiOutlineCheckCircle /> Mark as Read
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {sortedNotifications.length > 0 && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={clearAllNotifications}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {tempNotifications && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slideUp">
            <button 
              onClick={undoClear} 
              className="flex items-center gap-2 hover:bg-green-600 transition-colors duration-200 rounded"
            >
              <AiOutlineCheckCircle /> Undo Clear (10s)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
