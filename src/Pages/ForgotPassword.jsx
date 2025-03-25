import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import database, { updateStudentPassword } from '../database';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('ForgotPassword component mounted');
  }, []);

  const verifyStudentId = (e) => {
    e.preventDefault();
    console.log('Verifying student ID:', studentId);
    const student = database.students.find(student => student.studentId === studentId);
    if (student) {
      console.log('Student found:', student);
      setStep(2);
      setError('');
    } else {
      console.log('Student not found');
      setError('Invalid Student ID. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log('Attempting to update password for student:', studentId);
      const result = updateStudentPassword(studentId, newPassword);
      
      if (result.success) {
        console.log('Password updated successfully');
        setSuccess('Password has been reset successfully!');
        // Clear sensitive data
        setNewPassword('');
        setConfirmPassword('');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.log('Password update failed:', result.message);
        setError(result.message || 'Failed to update password. Please try again.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('An error occurred while resetting your password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Verify Student ID' : 'Reset Password'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={step === 1 ? verifyStudentId : handlePasswordReset}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            {step === 1 ? (
              <div>
                <label htmlFor="student-id" className="sr-only">
                  Student ID
                </label>
                <input
                  id="student-id"
                  name="student-id"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="new-password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {step === 1 ? 'Verify Student ID' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 