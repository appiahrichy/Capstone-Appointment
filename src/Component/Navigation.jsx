import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  // Get user type (either "student" or "staff"), defaulting to staff
  const userType = localStorage.getItem("userType") || "staff";
  const dashboardPath = userType === "student" ? "/studentdashboard" : "/dashboard";

  const getLinkClass = (path) => {
    return location.pathname === path ? "underline font-semibold" : "";
  };

  return (
    <div className="flex justify-center space-x-48 mt-4 text-lg text-blue-800">
      {/* Dynamic dashboard link based on user type */}
      <Link to={dashboardPath} className={getLinkClass(dashboardPath)}>Dashboard</Link>
      <Link to="/todo" className={getLinkClass("/todo")}>To-do</Link>
      <Link to="/notifications" className={getLinkClass("/notifications")}>Notifications</Link>
      <Link to="/inbox" className={getLinkClass("/inbox")}>Inbox</Link>
      <Link to="/settings" className={getLinkClass("/settings")}>Settings</Link>
    </div>
  );
};

export default Navigation;
