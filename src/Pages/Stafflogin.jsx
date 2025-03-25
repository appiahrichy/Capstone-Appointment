"use client"

import { useState, useCallback, memo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authenticateStaff } from '../database';
import { FaUserGraduate, FaLock, FaIdCard, FaArrowRight, FaShieldAlt, FaUserShield } from 'react-icons/fa';

const StaffLoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    staffId: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Memoized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Memoized login handler
  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Attempting staff login with:", { 
        username: formData.username, 
        staffId: formData.staffId,
        password: "***" // Don't log actual password
      });

      const result = authenticateStaff(
        formData.username, 
        formData.password, 
        formData.staffId
      );
      
      console.log("Staff login result:", result);
      
      if (result.success) {
        console.log("Login successful for staff:", result.staff);
        // Store complete staff data and user type in localStorage
        localStorage.setItem('staffInfo', JSON.stringify(result.staff));
        localStorage.setItem('userType', 'staff');
        navigate("/dashboard");
      } else {
        console.log("Login failed:", result.message);
        setError(result.message);
      }
    } catch (err) {
      console.error("Staff login error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate]);

  // Memoized form JSX
  const renderForm = useCallback(() => (
    <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
      <div className="relative group">
        <label htmlFor="staff-username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <div className="relative">
          <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <input
            type="text"
            id="staff-username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
            placeholder="Enter your username"
          />
        </div>
      </div>

      <div className="relative group">
        <label htmlFor="staff-id" className="block text-sm font-medium text-gray-700 mb-1">
          Staff ID
        </label>
        <div className="relative">
          <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <input
            type="text"
            id="staff-id"
            name="staffId"
            autoComplete="off"
            value={formData.staffId}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
            placeholder="Enter your staff ID"
          />
        </div>
      </div>

      <div className="relative group">
        <label htmlFor="staff-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <input
            type="password"
            id="staff-password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
            placeholder="Enter your password"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white py-2.5 md:py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="flex flex-col space-y-3 md:space-y-4 text-center">
        <Link to="/staff-forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors group">
          Forgot your password?
          <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <p className="text-sm text-gray-600">
          Having issues with your account?{" "}
          <Link to="/create-ticket" className="text-blue-600 hover:text-blue-800 transition-colors group">
            Create a ticket
            <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </p>
      </div>
    </form>
  ), [formData, error, isLoading, handleInputChange, handleLogin]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:p-8">
        {/* Left Section - Blue Background with Pattern */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-xl mx-auto">
            <div className="mb-6 md:mb-8">
              <FaUserShield className="mx-auto text-5xl md:text-6xl text-white mb-3 md:mb-4 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Staff Portal
              </h1>
              <p className="text-xl md:text-2xl mb-8 md:mb-12 text-blue-100">Access the KNUST staff portal</p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <FaUserGraduate className="text-2xl md:text-3xl text-blue-200" />
                <span className="text-base md:text-lg">Staff Portal Access</span>
              </div>
              <div className="flex items-center justify-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <FaShieldAlt className="text-2xl md:text-3xl text-blue-200" />
                <span className="text-base md:text-lg">Secure Authentication</span>
              </div>
              <div className="flex items-center justify-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300">
                <FaLock className="text-2xl md:text-3xl text-blue-200" />
                <span className="text-base md:text-lg">Protected Information</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-white/10 backdrop-blur-lg">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Staff Login</h2>
              <p className="text-gray-600">Please enter your credentials to continue</p>
            </div>

            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(StaffLoginPage);

