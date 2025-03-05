import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section - Blue Background */}
      <div className="w-1/3 bg-blue-500 flex justify-center items-center">
        <button className="absolute top-6 left-6 text-white text-xl"></button>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-2/3 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-2xl font-semibold mb-6">Login to your account.</h2>

        {/* Login Form */}
        <form className="w-2/3">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Student ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Corrected Link & Button */}
          <Link to="/Studentdashboard">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md text-lg">
              Login
            </button>
          </Link>
        </form>

        {/* Support Section */}
        <p className="text-gray-600 text-sm mt-4">
          Having issues with your account?{" "}
          <span className="text-red-500 cursor-pointer">Create a ticket</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
