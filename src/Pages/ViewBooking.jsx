import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Navigation from '../Component/Navigation';

const ViewBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.booking) {
      setBooking(location.state.booking);
      setLoading(false);
    } else {
      setError("No booking data found");
      setLoading(false);
    }
  }, [location]);

  const handleStatusChange = (newStatus) => {
    setBooking(prev => ({ ...prev, status: newStatus }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Medical':
        return 'bg-blue-100 text-blue-800';
      case 'Counseling':
        return 'bg-purple-100 text-purple-800';
      case 'Academic':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Navigation />
        <div className="flex justify-center items-center h-[calc(100vh-128px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Navigation />
        <div className="flex justify-center items-center h-[calc(100vh-128px)]">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Navigation />
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
            <button
              onClick={() => navigate('/todo')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Todo
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{booking.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(booking.type)}`}>
                  {booking.type}
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{booking.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{booking.duration}</span>
              </div>
            </div>

            {booking.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{booking.notes}</p>
              </div>
            )}

            <div className="flex gap-3">
              {booking.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange('cancelled')}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {booking.status === 'completed' && (
                <button
                  onClick={() => handleStatusChange('cancelled')}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
              )}
              {booking.status === 'cancelled' && (
                <button
                  onClick={() => handleStatusChange('pending')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reschedule
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking; 