import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";
import { Context } from "../GlobalContext/MyContextProvider";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(Context);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const men = data.filter((p) => p.category.toLowerCase().includes("men")).slice(0, 2);
        const women = data.filter((p) => p.category.toLowerCase().includes("women")).slice(0, 2);
        const jewel = data.filter((p) => p.category.toLowerCase().includes("jewel")).slice(0, 2);
        const selection = [...men, ...women, ...jewel];
        setFeatured(selection);
      })
      .catch(console.error);
  }, []);

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddOrBuy = (product, action) => {
    if (!user) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    if (action === "add") {
      alert("Product added to cart (demo)");
    } else if (action === "buy") {
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-6">Featured Categories (Preview)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onView={handleView}
            onAdd={(prod) => handleAddOrBuy(prod, "add")}
            onBuy={(prod) => handleAddOrBuy(prod, "buy")}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
