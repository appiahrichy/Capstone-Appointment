import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive ? "underline font-semibold" : "";
  };

  return (
    <div className="flex justify-center space-x-8 mt-4 text-lg text-blue-800">
      <Link to="/" className={getLinkClass("/")}>Dashboard</Link>
      <Link to="/todo" className={getLinkClass("/todo")}>To-do</Link>
      <Link to="/notifications" className={getLinkClass("/notifications")}>Notifications</Link>
      <Link to="/inbox" className={getLinkClass("/inbox")}>Inbox</Link>
      <Link to="/settings" className={getLinkClass("/settings")}>Settings</Link>
    </div>
  );
};

export default Navigation;
