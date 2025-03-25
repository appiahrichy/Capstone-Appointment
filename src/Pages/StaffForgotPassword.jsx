import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import database, { updateStaffPassword } from '../database';
import { FaUserShield, FaIdCard, FaLock, FaArrowRight } from 'react-icons/fa';

const StaffForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [staffId, setStaffId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyStaffId = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Verifying staff ID:', staffId);
    const staff = database.staff.find(staff => staff.staffId === staffId);
    if (staff) {
      console.log('Staff found:', staff);
      setStep(2);
      setError('');
    } else {
      console.log('Staff not found');
      setError('Invalid Staff ID. Please try again.');
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting to update password for staff:', staffId);
      const result = updateStaffPassword(staffId, newPassword);
      
      if (result.success) {
        console.log('Password updated successfully');
        setSuccess('Password has been reset successfully!');
        // Clear sensitive data
        setNewPassword('');
        setConfirmPassword('');
        // Redirect to staff login after 2 seconds
        setTimeout(() => {
          navigate('/stafflogin');
        }, 2000);
      } else {
        console.log('Password update failed:', result.message);
        setError(result.message || 'Failed to update password. Please try again.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('An error occurred while resetting your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      <div className="relative w-full max-w-md mx-auto p-4 md:p-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <FaUserShield className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 ? 'Verify Staff ID' : 'Reset Password'}
            </h2>
            <p className="text-gray-600">
              {step === 1 
                ? 'Please enter your Staff ID to verify your account'
                : 'Please enter your new password'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 animate-shake">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={step === 1 ? verifyStaffId : handlePasswordReset} className="space-y-6">
            {step === 1 ? (
              <div className="relative group">
                <label htmlFor="staff-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Staff ID
                </label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    id="staff-id"
                    name="staff-id"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                    placeholder="Enter your Staff ID"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="relative group">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{step === 1 ? 'Verify Staff ID' : 'Reset Password'}</span>
                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/stafflogin')}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors group"
              >
                Back to Staff Login
                <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffForgotPassword; 