import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import DashboardLayout from "./pages/DashboardLayout";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Delivery from "./pages/Delivery";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Men from "./pages/Men";
import Women from "./pages/Women";
import Jewelery from "./pages/Jewelery";
import Electronics from "./pages/Electronics";

import Addnewadress from "./Components/curd/Addnewadress";
import EditAdress from "./Components/curd/EditAdress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <Details /> },
      { path: "cart", element: <Cart /> },
      { path: "address", element: <Address /> },
      { path: "delivery/:id", element: <Delivery /> },
      { path: "confirm", element: <Confirmation /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
      index: true, element: <AllProducts />},
      { path: "allproducts", element: <AllProducts /> },
      { path: "men", element: <Men /> },
      { path: "women", element: <Women /> },
      { path: "kids", element: <Jewelery /> },
      { path: "access", element: <Electronics /> },
      { path: "cart", element: <Cart /> },
      { path: "address", element: <Address /> },
      { path: "addnewaddress", element: <Addnewadress /> },
      { path: "editaddress/:id", element: <EditAdress /> },
      { path: "details/:id", element: <Details /> },
      { path: "delivery/:id", element: <Delivery /> },
      { path: "confirm", element: <Confirmation /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
