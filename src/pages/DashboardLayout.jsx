import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { Context } from "../GlobalContext/MyContextProvider";
import AllProducts from "./AllProducts";

const DashboardLayout = () => {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-yellow-900 text-white p-4">
        <div className="mb-6">
          <h3 className="font-bold text-lg">Welcome{user ? `, ${user.name || ''}` : ""}</h3>
        </div>
        <Sidebar />
        <div className="mt-6">
          <button
            className="w-full bg-white text-yellow-900 rounded py-2 font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 p-6 bg-gray-50 border-2 border-red">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
