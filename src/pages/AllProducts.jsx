import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Context } from "../GlobalContext/MyContextProvider";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();
  const { user, cart, updateCart } = useContext(Context);

  // ✅ Fetch all products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // ✅ Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  // ✅ Add to cart logic
  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }
    updateCart(product);
  };

  // ✅ Buy now logic
  const handleBuyNow = (product) => {
    if (!user) {
      alert("Please login to buy this product!");
      navigate("/login");
      return;
    }
    navigate(`/products/${product.id}`);
  };

  // ✅ Pagination buttons
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        🛍️ All Products
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-4 shadow hover:shadow-xl flex flex-col items-center"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-48 w-full object-contain mb-3 rounded"
              />
              <h3 className="font-semibold text-center mb-2 line-clamp-2">
                {p.title}
              </h3>
              <p className="text-green-700 font-bold mb-3">${p.price}</p>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-gray-200 w-full py-2 rounded hover:bg-gray-300 transition-all"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(p)}
                  className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition-all"
                >
                  Buy Now
                </button>
              </div>

              <button
                onClick={() => navigate(`/products/${p.id}`)}
                className="mt-3 bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition-all"
              >
                View Details
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            Loading...
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-600 text-white hover:bg-yellow-700"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === index + 1
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-300 hover:bg-yellow-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-600 text-white hover:bg-yellow-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
