import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">AppointmentPro</h1>
      <div>
      <Link to="/StudentorStaff">
      <button  className="bg-white text-blue-500 px-4 py-2 mr-2 rounded" >Log in</button>

      </Link>
        <button className="bg-gray-300 px-4 py-2 rounded">Get Demo</button>
      </div>
    </header>
  );
};

export default Header;