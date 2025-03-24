"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const StaffLoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [staffId, setStaffId] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("") // Clear previous errors
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, staffId }),
      })

      if (response.ok) {
        // Navigate to dashboard if login is successful
        navigate("/Dashboard")
      } else {
        // Show error message for invalid credentials
        const data = await response.json()
        setError(data.error || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      console.error(err) // Log the actual error
      setError("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateTicket = () => {
    navigate("/support/create-ticket")
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
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Staff ID</label>
            <input
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Show error message if login fails */}
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-md text-sm sm:text-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-3 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">
            Forgot your password?
          </Link>
        </div>

        {/* Support Section */}
        <p className="text-gray-600 text-xs sm:text-sm mt-4 text-center">
          Having issues with your account?{" "}
          <span className="text-blue-500 hover:underline" onClick={handleCreateTicket}>
            Create a ticket
          </span>
        </p>
      </div>
    </div>
  )
}

export default StaffLoginPage

