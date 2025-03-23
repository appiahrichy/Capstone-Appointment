import { useState, useEffect } from "react";
import { AiOutlineBell, AiOutlineCheckCircle, AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [tempNotifications, setTempNotifications] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  useEffect(() => {
    // Simulating API call for notifications
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          title: "Upcoming Appointment",
          date: "March 22, 2025",
          time: "11:00 AM",
          location: "Hospital",
          notes: "Bring previous medical records",
          read: false,
          priority: "high"
        },
        {
          id: 2,
          title: "Schedule Change",
          date: "March 23, 2025",
          time: "11:00 AM",
          location: "Hospital",
          notes: "Confirmed via email",
          read: false,
          priority: "medium"
        },
        {
          id: 3,
          title: "Reminder",
          date: "April 2, 2025",
          time: "14:00 PM",
          location: "Hospital",
          notes: "Fast for 12 hours before the appointment",
          read: false,
          priority: "high"
        },
        {
          id: 4,
          title: "Lab Test Results Available",
          date: "April 5, 2025",
          time: "09:00 AM",
          location: "Online Portal",
          notes: "Check your online portal for results",
          read: false,
          priority: "medium"
        },
        {
          id: 5,
          title: "Medication Refill Reminder",
          date: "April 10, 2025",
          time: "10:00 AM",
          location: "Pharmacy",
          notes: "Your medication refill is due",
          read: false,
          priority: "high"
        },
      ]);
    }, 1000);

    // Real-time notification updates
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        title: "New Update",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        location: "System",
        notes: "Real-time update example",
        read: false,
        priority: "low"
      };
      setNotifications(prev => [...prev, newNotification]);
    }, 300000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setTempNotifications(notifications);
    setNotifications([]);
    const timeout = setTimeout(() => {
      setTempNotifications(null);
    }, 10000);
    setUndoTimeout(timeout);
  };

  const undoClear = () => {
    if (tempNotifications) {
      setNotifications(tempNotifications);
      setTempNotifications(null);
      clearTimeout(undoTimeout);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Notifications</h2>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <AiOutlineBell className="mx-auto text-6xl text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No new notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white p-4 rounded-lg border-l-4 shadow-md transition-all hover:shadow-lg ring-1 ring-blue-400 ${
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
                          className={notification.read ? "text-gray-400" : "text-blue-500"} 
                          size={20} 
                        />
                        <h3 className={`font-semibold ${notification.read ? "text-gray-400" : "text-gray-800"}`}>
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
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        <AiOutlineDelete /> Dismiss
                      </button>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors border border-gray-200"
                      >
                        <AiOutlineCheckCircle /> Mark as Read
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length > 0 && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={clearAllNotifications}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
            <button onClick={undoClear} className="flex items-center gap-2">
              <AiOutlineCheckCircle /> Undo Clear (10s)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
