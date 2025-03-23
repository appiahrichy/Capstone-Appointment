import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  // Get user type (either "student" or "staff"), defaulting to staff
  const userType = localStorage.getItem("userType") || "staff";
  const dashboardPath = userType === "student" ? "/studentdashboard" : "/dashboard";

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-500";
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16 mt-4 text-lg text-blue-800">
      {/* Dynamic dashboard link based on user type */}
      <Link to={dashboardPath} className={`${getLinkClass(dashboardPath)} px-2`}>
        Dashboard
      </Link>
      <Link to="/todo" className={`${getLinkClass("/todo")} px-2`}>
        To-do
      </Link>
      <Link to="/notifications" className={`${getLinkClass("/notifications")} px-2`}>
        Notifications
      </Link>
      <Link to="/inbox" className={`${getLinkClass("/inbox")} px-2`}>
        Inbox
      </Link>
      <Link to="/settings" className={`${getLinkClass("/settings")} px-2`}>
        Settings
      </Link>
    </div>
  );
};

export default Navigation;
