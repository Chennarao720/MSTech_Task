import React, { useEffect, useState, useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Electronics = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state
  const itemsPerPage = 3;

  const { user, cart, setCart } = useContext(Context);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000"; // ✅ Your JSON Server base URL

  // ✅ Fetch products
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // ✅ Filter only electronics category
  const electronics = cards.filter(
    (product) => product.category === "electronics"
  );

  // ✅ Apply search filter
  const filteredElectronics = electronics.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredElectronics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredElectronics.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Add to Cart (with JSON Server)
  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    const newProduct = {
      ...product,
      userId: user.id,
      quantity: 1,
    };

    try {
      // ✅ Check if already exists for this user
      const existing = await fetch(
        `${API_URL}/cart?userId=${user.id}&id=${product.id}`
      );
      const existingData = await existing.json();

      if (existingData.length > 0) {
        alert("This item is already in your cart!");
        return;
      }

      // ✅ Add item
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const savedItem = await res.json();
        setCart((prev) => [...prev, savedItem]);
        alert(`${product.title.substring(0, 25)} added to cart ✅`);
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Buy Now handler
  const handleBuyNow = (product) => {
    if (!user) {
      alert("Please login to buy");
      navigate("/login");
      return;
    }
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 pb-24">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        🔌 Electronics
      </h1>

      {/* ✅ Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
          placeholder="Search electronics..."
          className="w-full sm:w-1/2 p-3 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ✅ Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 text-lg col-span-full">
            Loading...
          </p>
        ) : currentItems.length > 0 ? (
          currentItems.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-4 flex flex-col items-center shadow hover:shadow-xl transition-all"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-48 object-contain mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800 text-center mb-2 line-clamp-2">
                {p.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1 capitalize">
                {p.category}
              </p>

              <CountUp
                className="text-xl font-bold text-green-600 mb-3"
                prefix="$"
                start={0}
                end={p.price}
                duration={1}
              />

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-gray-200 hover:bg-gray-300 w-full py-2 rounded font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(p)}
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold"
                >
                  Buy Now
                </button>
              </div>

              <button
                onClick={() => navigate(`/products/${p.id}`)}
                className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded font-semibold"
              >
                View Details
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            No products found
          </p>
        )}
      </section>

      {/* ✅ Pagination */}
      {filteredElectronics.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded font-semibold shadow ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded font-semibold shadow ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded font-semibold shadow ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Electronics;
