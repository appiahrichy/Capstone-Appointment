import { useState } from "react";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = ["2024", "2025", "2026", "2027", "2028"];

  const generateTimeSlots = () => {
    const slots = [];
    let hour = 9;
    let minute = 0;

    while (hour < 17 || (hour === 17 && minute === 0)) {
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute === 0 ? "00" : "30"} ${
        hour < 12 ? "AM" : "PM"
      }`;
      slots.push(formattedTime);
      if (minute === 0) {
        minute = 30;
      } else {
        minute = 0;
        hour++;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowTimeSelection(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Navigation />
      <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
          Select a Date & Time
        </h2>
        <hr className="w-32 mx-auto border-blue-600 mb-6" />

        <div className="flex gap-4 items-center justify-center">
          <div className="bg-white shadow-lg p-6 rounded-lg h-[500px] w-[350px]">
            <div className="flex justify-between mb-4">
              <select
                className="border p-2 rounded"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select
                className="border p-2 rounded"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              {months[selectedMonth]} {selectedYear}
            </h3>
            <div className="grid grid-cols-7 text-gray-600 text-sm font-semibold text-center mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array(getFirstDayOfMonth(selectedMonth, selectedYear))
                .fill(null)
                .map((_, i) => <div key={`empty-${i}`} className="w-10 h-10"></div>)}
              {Array(getDaysInMonth(selectedMonth, selectedYear)).fill().map((_, i) => {
                const day = i + 1;
                return (
                  <button
                    key={day}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedDate === day
                        ? "bg-blue-600 text-white scale-110 shadow-md"
                        : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {showTimeSelection && (
            <div className="bg-white shadow-lg p-6 rounded-lg w-64 h-[500px] flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                {selectedDate ? `${months[selectedMonth]} ${selectedDate}, ${selectedYear}` : "Select a Date"}
              </h3>
              <div className="flex flex-col gap-3 flex-grow overflow-y-auto p-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`w-full py-2 border rounded-lg text-lg font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "border-blue-400 text-blue-600 hover:bg-blue-100"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <Link to="/AppointmentConfirmed">
                <button
                  className="mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 w-full text-lg"
                  disabled={!selectedTime}
                >
                  Next
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
