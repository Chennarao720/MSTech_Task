import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();
  const location = useLocation();

  // helper function to check if path is active
  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `w-full text-left px-4 py-2 rounded-lg font-semibold transition ${
      isActive(path)
        ? "bg-yellow-600 text-white shadow-md"  // active style
        : "text-gray-800 hover:bg-yellow-100"   // normal style
    }`;

  return (
    <div >
      <ul className="space-y-3">
        <li>
          <button
            onClick={() => nav("/dashboard/allproducts")}
            className={linkClasses("/dashboard/allproducts")}
          >
            All Products
          </button>
        </li>
        <li>
          <button
            onClick={() => nav("/dashboard/men")}
            className={linkClasses("/dashboard/men")}
          >
            Men
          </button>
        </li>
        <li>
          <button
            onClick={() => nav("/dashboard/women")}
            className={linkClasses("/dashboard/women")}
          >
            Women
          </button>
        </li>
        <li>
          <button
            onClick={() => nav("/dashboard/kids")}
            className={linkClasses("/dashboard/kids")}
          >
            Jewelry
          </button>
        </li>
         <li>
          <button
            onClick={() => nav("/dashboard/access")}
            className={linkClasses("/dashboard/access")}
          >
            Electronics
          </button>
          
        </li>
         <li>
          <button
            onClick={() => nav("/dashboard/cart")}
            className={linkClasses("/dashboard/cart")}
          >
            Cart
          </button>
          
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
