import { Link, useNavigate } from "react-router-dom";

const StudentOrStaff = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-blue-500 text-white p-8 rounded-2xl w-96 md:w-[6000px] lg:w-[600px] shadow-lg">
        <button onClick={() => navigate(-1)} className="text-white text-xl mb-4">
          ⬅
        </button>
        <h2 className="text-lg font-semibold text-center mb-6">
          Are you a student or a staff?
        </h2>
        <div className="flex flex-col items-center gap-4">
          <Link to="/Login">
            <button className="bg-white text-blue-500 px-6 py-3 rounded-lg w-40 text-lg font-medium hover:bg-gray-200 transition">
              Student
            </button>
          </Link>
          <Link to="/Stafflogin">
            <button className="bg-white text-blue-500 px-6 py-3 rounded-lg w-40 text-lg font-medium hover:bg-gray-200 transition">
              Staff
            </button>
          </Link> {/* Corrected this closing tag */}
        </div>
      </div>
    </div>
  );
};

export default StudentOrStaff;
