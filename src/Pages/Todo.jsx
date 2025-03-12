import { useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar"; // Standard Navbar
import Navigation from "../Component/Navigation.jsx"; // Standard Navigation
import Footer from "../Component/Footer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, department: "Counseling Department", status: "pending" },
    { id: 2, department: "Hospital Department", status: "canceled" },
    { id: 3, department: "Academic Department", status: "completed" },
  ]);
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(null);

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white text-center p-4 fixed w-full top-0">
        <h1>Welcome To Your To-do</h1>
        <nav className="flex justify-center gap-4 mt-2">
          <a href="#" className="font-bold">Dashboard</a>
          <a href="#" className="font-bold">To-do</a>
          <a href="#" className="font-bold">Inbox</a>
          <a href="#" className="font-bold">Settings</a>
        </nav>
      </header>
      
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 w-48 p-4 bg-white shadow-md">
        {["all", "pending", "canceled", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className="block w-full text-left p-2 hover:bg-gray-200"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </aside>

      {/* Content */}
      <main className="ml-56 mt-20 p-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 mb-4 rounded shadow relative">
            <strong>{task.department}</strong>
            <span className={`float-right p-1 rounded ${
              task.status === "pending" ? "text-yellow-500" :
              task.status === "canceled" ? "text-red-500" : "text-green-500"
            }`}>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
            
            <button onClick={() => setMenuOpen(menuOpen === task.id ? null : task.id)}>
              ⚙️
            </button>
            {menuOpen === task.id && (
              <div className="absolute top-10 right-4 bg-white shadow-md border p-2 w-40">
                <ul>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">Edit</li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">Add Internal Note</li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">Reminder</li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">Cancel</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default ToDoApp;
