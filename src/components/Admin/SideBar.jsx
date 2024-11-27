import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signout } from "../../api_calls/userApi";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signout();
    navigate("/login");
  };
  return (
    <>
      <aside className="max-w-72 max-h-[100vh] bg-blue-800 text-white flex flex-col sticky top-0" id="sidebar">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4">
          <ul>
            <NavLink
              to="/admin/dashboard"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md"
            >
              <i className="fas fa-tachometer-alt"></i>
              <span className="ml-2">Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/todaysbooking"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md"
            >
              <i className="fas fa-calendar-day"></i>
              <span className="ml-2">Today's Bookings</span>
            </NavLink>
            <NavLink
              to="/admin/weekbookings"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md"
            >
              <i className="fas fa-calendar-week"></i>
              <span className="ml-2">View All Bookings (7 days)</span>
            </NavLink>

            <NavLink
            to="/admin/getusers"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md"
            >
              <i className="fas fa-users"></i>
              <span className="ml-2">Manage Users</span>
            </NavLink>
            <NavLink
              to="/admin/todaysbookingf"
              id="settings-button"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md"
            >
              <i className="fas fa-cogs"></i>
              <span className="ml-2">Settings</span>
              <i className="fas fa-chevron-down ml-auto"></i>
            </NavLink>

            <ul
              id="settings-dropdown"
              className="absolute left-0 w-full mt-2 bg-blue-800 text-white rounded-md shadow-lg hidden"
            >
              <li className="px-4 py-2 hover:bg-blue-600">
                <NavLink to="/admin/todaysbooking1">Change Password</NavLink>
              </li>
              <li className="px-4 py-2 hover:bg-blue-600">
                <NavLink to="/admin/todaysbookingg">
                  Additional Settings
                </NavLink>
              </li>
            </ul>
          </ul>
        </nav>
        <div className="p-4">
          <img src="/logo.png" alt=""></img>
        </div>
        <div className="p-4 ">
          <button
            className="w-full text-center py-2 bg-red-500 hover:bg-red-600 rounded-md logout-btn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
