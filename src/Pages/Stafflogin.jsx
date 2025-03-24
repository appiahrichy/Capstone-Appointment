import { Link } from "react-router-dom";

const StaffLoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Blue Background */}
      <div className="w-full md:w-1/3 bg-blue-500 flex justify-center items-center py-12 md:py-0">
        <button className="absolute top-6 left-6 text-white text-xl"></button>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-white p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Login to your account
        </h2>

        {/* Login Form */}
        <form className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">
              Staff ID
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Login Button */}
          <Link to="/Dashboard">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md text-sm sm:text-lg">
              Login
            </button>
          </Link>
        </form>

        {/* Support Section */}
        <p className="text-gray-600 text-xs sm:text-sm mt-4 text-center">
          Having issues with your account?{" "}
          <span className="text-red-500 cursor-pointer">Create a ticket</span>
        </p>
      </div>
    </div>
  );
};

export default StaffLoginPage;
