import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation.jsx";
import { getAvailableTimeSlots } from '../database';

const DateandTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Memoize static data
  const months = useMemo(() => [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ], []);

  const years = useMemo(() => ["2024", "2025", "2026", "2027", "2028"], []);

  const getDaysInMonth = useCallback((month, year) => new Date(year, month + 1, 0).getDate(), []);
  const getFirstDayOfMonth = useCallback((month, year) => new Date(year, month, 1).getDay(), []);

  const checkLoginAndType = useCallback(() => {
    const studentInfo = localStorage.getItem('studentInfo');
    if (!studentInfo) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (location.state?.type) {
      setAppointmentType(location.state.type);
    } else {
      setError('Please select an appointment type first');
      navigate(-1);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    checkLoginAndType();
  }, [checkLoginAndType]);

  const handleDateClick = useCallback(async (day) => {
    if (isNavigating) return;
    
    setSelectedDate(day);
    setShowTimeSelection(true);
    setSelectedTime(null);
    setLoading(true);
    setError(null);

    const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    try {
      const slots = await getAvailableTimeSlots('default', formattedDate);
      setAvailableSlots(slots);
    } catch (err) {
      setError('Failed to fetch available time slots');
      console.error('Error fetching time slots:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth, isNavigating]);

  const handleTimeSelect = useCallback((time) => {
    setSelectedTime(time);
  }, []);

  const handleNext = useCallback(() => {
    if (isNavigating) return;
    
    if (!selectedTime) {
      setError('Please select a time');
      return;
    }

    if (!appointmentType) {
      setError('Please select an appointment type');
      return;
    }

    const studentInfo = localStorage.getItem('studentInfo');
    if (!studentInfo) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setIsNavigating(true);
    const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;

    navigate('/confirmation', {
      state: {
        appointmentDetails: {
          date: formattedDate,
          time: selectedTime,
          type: appointmentType,
          staffId: 'default',
          staffName: 'Default Staff'
        }
      },
      replace: true
    });
  }, [selectedTime, appointmentType, selectedYear, selectedMonth, selectedDate, navigate, location.pathname, isNavigating]);

  // Memoize the calendar grid
  const calendarGrid = useMemo(() => {
    const days = Array(getDaysInMonth(selectedMonth, selectedYear)).fill().map((_, i) => i + 1);
    const emptyDays = Array(getFirstDayOfMonth(selectedMonth, selectedYear)).fill(null);
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="w-10 h-10"></div>
        ))}
        {days.map((day) => (
          <button
            key={day}
            id={`date-button-${day}`}
            name={`date-button-${day}`}
            autoComplete="off"
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
              selectedDate === day
                ? "bg-blue-600 text-white scale-110 shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleDateClick(day)}
            disabled={isNavigating}
          >
            {day}
          </button>
        ))}
      </div>
    );
  }, [selectedMonth, selectedYear, selectedDate, handleDateClick, isNavigating]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Navigation />
      <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
          Select a Date & Time
        </h2>
        <hr className="w-32 mx-auto border-blue-600 mb-6" />

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center w-full">
          {/* Calendar Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg w-full sm:w-96">
            <div className="flex justify-between mb-4">
              <select
                id="month-select"
                name="month-select"
                autoComplete="off"
                className="border p-2 rounded"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                disabled={isNavigating}
              >
                {months.map((month, index) => (
                  <option 
                    key={month} 
                    value={index}
                    id={`month-option-${index}`}
                    name={`month-option-${index}`}
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                id="year-select"
                name="year-select"
                autoComplete="off"
                className="border p-2 rounded"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                disabled={isNavigating}
              >
                {years.map((year) => (
                  <option 
                    key={year} 
                    value={year}
                    id={`year-option-${year}`}
                    name={`year-option-${year}`}
                  >
                    {year}
                  </option>
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
            {calendarGrid}
          </div>

          {/* Time Selection Section */}
          {showTimeSelection && (
            <div className="bg-white shadow-lg p-6 rounded-lg w-full sm:w-80">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                {selectedDate ? `${months[selectedMonth]} ${selectedDate}, ${selectedYear}` : "Select a Date"}
              </h3>

              {loading ? (
                <p className="text-center text-blue-600">Loading available times...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : (
                <div className="flex flex-col gap-3 max-h-72 overflow-y-auto p-2">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      id={`time-button-${time.replace(':', '-')}`}
                      name={`time-button-${time.replace(':', '-')}`}
                      autoComplete="off"
                      className={`w-full py-2 border rounded-lg text-lg font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? "bg-blue-600 text-white shadow-lg scale-105"
                          : "border-blue-400 text-blue-600 hover:bg-blue-100"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                      disabled={isNavigating}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}

              <button
                id="next-button"
                name="next-button"
                autoComplete="off"
                className="mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 w-full text-lg transition-all duration-200"
                disabled={!selectedTime || isNavigating}
                onClick={handleNext}
              >
                {isNavigating ? 'Processing...' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateandTime;
