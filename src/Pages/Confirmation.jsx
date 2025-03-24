import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Confirmation = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState("");

  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://api.example.com/user/details"); // Replace with actual API
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    // Retrieve the selected time from localStorage
    const storedTime = localStorage.getItem("selectedTime");
    if (storedTime) {
      setSelectedTime(storedTime);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <Navigation activePath={location.pathname} />

      <div className="flex flex-col items-center mt-6 px-4 sm:px-6">
        <h2 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
          Confirm your details
        </h2>

        <div className="border border-blue-400 rounded-lg shadow-md p-6 mt-6 w-full max-w-sm sm:max-w-md">
          <Link to="/DateandTime" className="inline-block mb-4">
            <ArrowLeft className="text-blue-500" />
          </Link>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  value={userData?.email || "N/A"}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Student ID</label>
                <input
                  type="text"
                  value={userData?.studentId || "N/A"}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200"
                />
              </div>

              <p className="text-sm">Duration: 30 min</p>
              <p className="text-sm">Web conferencing details provided upon confirmation.</p>
              <p className="text-sm mt-2 font-semibold text-blue-600">
                {selectedTime ? selectedTime : "No time selected"}
              </p>
              <p className="text-sm">UTC Time</p>

              <Link to="/AppointmentConfirmed">
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center text-lg">
                  Schedule Event
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
