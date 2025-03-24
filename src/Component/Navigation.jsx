import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";

const Navigation = () => {
  const location = useLocation();
  const { translate } = useLanguage();

  // Get user type (either "student" or "staff"), defaulting to staff
  const userType = localStorage.getItem("userType") || "staff";
  const dashboardPath = userType === "student" ? "/studentdashboard" : "/dashboard";

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-500";
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 mt-3 text-sm sm:text-base md:text-lg text-blue-800">
      {/* Dynamic dashboard link based on user type */}
      <Link to={dashboardPath} className={`${getLinkClass(dashboardPath)} px-1 sm:px-2`}>
        Dashboard
      </Link>
      <Link to="/todo" className={`${getLinkClass("/todo")} px-1 sm:px-2`}>
        To-do
      </Link>
      <Link to="/notifications" className={`${getLinkClass("/notifications")} px-1 sm:px-2`}>
        Notifications
      </Link>
      <Link to="/inbox" className={`${getLinkClass("/inbox")} px-1 sm:px-2`}>
        Inbox
      </Link>
      <Link to="/settings" className={`${getLinkClass("/settings")} px-1 sm:px-2`}>
        Settings
      </Link>
    </div>
  );
};

export default Navigation;
