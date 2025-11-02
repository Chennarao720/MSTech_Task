import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
  "https://images.unsplash.com/photo-1606813902917-9c9f0caa5e8e?w=800",
  "https://images.unsplash.com/photo-1585386959984-a41552231693?w=800",
  "https://images.unsplash.com/photo-1612831662375-295c1003d3cc?w=800",
  "https://images.unsplash.com/photo-1556906781-9d3f0e3e87c5?w=800",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
];

const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* Scrolling Banner */}
      <div className="overflow-hidden w-full bg-gray-100 py-2">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...images, ...images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`banner-${i}`}
              className="h-[100px] w-auto object-cover rounded-lg shadow-md"
            />
          ))}
        </motion.div>
      </div>

      <main className="max-w-30 mx-auto p-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
