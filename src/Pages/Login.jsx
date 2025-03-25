"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authenticateStudent } from '../database';

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [studentId, setStudentId] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("") // Clear previous errors

    try {
      console.log("Attempting student login with:", { 
        username, 
        studentId,
        password: "***" // Don't log actual password
      });
      const result = authenticateStudent(username, password, studentId);
      console.log("Student login result:", result);
      
      if (result.success) {
        console.log("Login successful for student:", result.student);
        localStorage.setItem('studentInfo', JSON.stringify(result.student));
        navigate("/Studentdashboard")
      } else {
        console.log("Login failed:", result.message);
        setError(result.message);
      }
    } catch (err) {
      console.error("Student login error:", err)
      setError("An error occurred. Please try again later.")
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Blue Background */}
      <div className="w-full md:w-1/3 bg-blue-500 flex justify-center items-center py-12 md:py-0">
        <button className="absolute top-6 left-6 text-white text-xl"></button>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-white p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Login to your account</h2>

        {/* Login Form */}
        <form className="w-full max-w-xs sm:max-w-sm md:max-w-md" onSubmit={handleLogin}>
          <div className="mb-3 sm:mb-4">
            <label htmlFor="student-username" className="block text-gray-700 mb-1 text-sm sm:text-base">Username</label>
            <input
              type="text"
              id="student-username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-3 sm:mb-4">
            <label htmlFor="student-id" className="block text-gray-700 mb-1 text-sm sm:text-base">Student ID</label>
            <input
              type="text"
              id="student-id"
              name="studentId"
              autoComplete="off"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-3 sm:mb-4">
            <label htmlFor="student-password" className="block text-gray-700 mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              id="student-password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Show error message if login fails */}
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>

          <div className="mt-4 text-center text-sm">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="mt-2 text-center text-sm">
            Having issues with your account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create a ticket
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

