import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../GlobalContext/MyContextProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(Context);

  return (
    <nav className="bg-gradient-to-r from-yellow-700 to-yellow-900 shadow h-16 flex items-center px-6 justify-between">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://thumbs.dreamstime.com/b/vector-graphic-emblem-hexagon-initials-letter-jm-logo-design-template-vector-graphic-initials-letter-jm-logo-design-template-204623041.jpg"
          alt="logo"
          className="h-10 w-10 rounded-full bg-white"
        />
        <span className="text-white font-bold text-xl">J-M Store</span>
      </div>

      <div className="text-white font-semibold animate-pulse">
        Welcome to J-M Store ✨
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white font-semibold">
              Hi, {user.name || "User"}
            </span>
            <button
              onClick={() => navigate("/dashboard/cart")}
              className="bg-yellow-500 text-white px-4 py-1 rounded-full"
            >
              Cart 🛒
            </button>
            <button
              onClick={() => logout()}
              className="bg-red-600 text-white px-4 py-1 rounded-full"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-yellow-700 px-4 py-1 rounded-full"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-yellow-600 text-white px-4 py-1 rounded-full"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
