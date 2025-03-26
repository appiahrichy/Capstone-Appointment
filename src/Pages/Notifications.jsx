import { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineBell, AiOutlineCheckCircle, AiOutlineDelete, AiOutlineStar, AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation";
import { generateUniqueId } from "../utils/idGenerator";

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
  const [processedAppointmentIds] = useState(new Set());
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'priority'

  // Memoized function to get location based on type
  const getLocation = useCallback((type) => {
    // Check if the type includes any of the known types
    for (const [key, value] of Object.entries(LOCATION_MAPPING)) {
      if (type.includes(key)) {
        return value;
      }
    }
    return "Not specified";
  }, []);

  // Handle new appointments
  useEffect(() => {
    const handleNewAppointment = (event) => {
      console.log('Received new appointment event:', event.detail);
      const { appointmentId, date, time, location, notes, type, priority } = event.detail;
      
      // Check if we've already processed this appointment
      if (!processedAppointmentIds.has(appointmentId)) {
        const newNotification = {
          id: generateUniqueId(appointmentId, 'appointment'),
          title: "New Appointment Created",
          date,
          time,
          location,
          notes,
          type: "appointment",
          read: false,
          priority: priority || "medium",
          appointmentId
        };

        console.log('Creating new notification:', newNotification);
        processedAppointmentIds.add(appointmentId);
        
        setNotifications(prev => {
          const updated = [newNotification, ...prev];
          localStorage.setItem('notifications', JSON.stringify(updated));
          return updated;
        });
      }
    };

    window.addEventListener('newAppointment', handleNewAppointment);
    return () => window.removeEventListener('newAppointment', handleNewAppointment);
  }, [processedAppointmentIds]);

  // Check for upcoming appointments
  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = new Date();
      const newReminders = notifications
        .filter(notification => 
          notification.type === "appointment" && 
          !processedAppointmentIds.has(`${notification.appointmentId}-reminder`)
        )
        .reduce((acc, notification) => {
          const appointmentDate = new Date(`${notification.date} ${notification.time}`);
          const timeDiff = appointmentDate - now;
          
          if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000) {
            const reminderNotification = {
              id: generateUniqueId(notification.appointmentId, 'reminder'),
              title: "Upcoming Appointment Reminder",
              date: notification.date,
              time: notification.time,
              location: notification.location,
              notes: `Reminder: You have an appointment scheduled for ${notification.date} at ${notification.time}. Please arrive at ${notification.location} 15 minutes before your scheduled time.`,
              type: "reminder",
              read: false,
              priority: notification.priority,
              appointmentId: notification.appointmentId
            };
            
            processedAppointmentIds.add(`${notification.appointmentId}-reminder`);
            acc.push(reminderNotification);
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
  }, [notifications, processedAppointmentIds]);

  // Load notifications and appointments
  useEffect(() => {
    const loadData = () => {
      // Load notifications
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        // Initialize processed appointment IDs from existing notifications
        parsedNotifications.forEach(notification => {
          processedAppointmentIds.add(notification.appointmentId);
        });
        setNotifications(parsedNotifications);
      }

      // Load appointments and create notifications only for new ones
      const savedAppointments = localStorage.getItem('appointments');
      if (savedAppointments) {
        const appointments = JSON.parse(savedAppointments);
        const newAppointmentNotifications = appointments
          .filter(appointment => !processedAppointmentIds.has(appointment.id))
          .map(appointment => {
            processedAppointmentIds.add(appointment.id);
            return {
              id: generateUniqueId(appointment.id, 'appointment'),
              title: "New Appointment Created",
              date: appointment.date,
              time: appointment.time,
              location: appointment.location || getLocation(appointment.type),
              notes: appointment.notes,
              type: "appointment",
              read: false,
              priority: appointment.priority || "medium",
              appointmentId: appointment.id
            };
          });
        
        if (newAppointmentNotifications.length > 0) {
          setNotifications(prev => {
            const updated = [...newAppointmentNotifications, ...prev];
            localStorage.setItem('notifications', JSON.stringify(updated));
            return updated;
          });
        }
      }
    };

    loadData();
  }, [getLocation, processedAppointmentIds]);

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

  // Memoized filtered and sorted notifications
  const filteredAndSortedNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(notification => 
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply read/unread filter
    if (filter === 'unread') {
      filtered = filtered.filter(notification => !notification.read);
    } else if (filter === 'read') {
      filtered = filtered.filter(notification => notification.read);
    }

    // Apply priority filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(notification => notification.priority === selectedPriority);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
    });
  }, [notifications, filter, searchQuery, selectedPriority, sortBy]);

  // Notification statistics
  const stats = useMemo(() => ({
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    highPriority: notifications.filter(n => n.priority === 'high').length,
    mediumPriority: notifications.filter(n => n.priority === 'medium').length,
    lowPriority: notifications.filter(n => n.priority === 'low').length
  }), [notifications]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Notification Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Notifications</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Unread</h3>
            <p className="text-3xl font-bold text-red-500">{stats.unread}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">High Priority</h3>
            <p className="text-3xl font-bold text-red-500">{stats.highPriority}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Medium Priority</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.mediumPriority}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Notifications</h2>
          {filteredAndSortedNotifications.length === 0 ? (
            <div className="text-center py-8">
              <AiOutlineBell className="mx-auto text-6xl text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No notifications found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedNotifications.map((notification) => (
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
              {filteredAndSortedNotifications.length > 0 && (
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
