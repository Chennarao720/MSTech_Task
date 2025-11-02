import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const API_URL = "http://localhost:5000";

  // ✅ Load logged-in user & their cart
  const loadUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users?isLoggedIn=true`);
      const data = await res.json();

      if (data.length > 0) {
        const loggedUser = data[0];
        setUser(loggedUser);
        await loadCart(loggedUser.id);
      } else {
        setUser(null);
        setCart([]);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // ✅ Load the cart from JSON server for a specific user
  const loadCart = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/cart?userId=${userId}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  // ✅ Add to cart (no duplicates)
  const updateCart = async (product) => {
    if (!user) {
      alert("Please login to add items to your cart");
      return;
    }

    const existing = cart.find((item) => item.productId === product.id);
    if (existing) {
      alert("🛒 This product is already in your cart!");
      return;
    }

    const newItem = {
      ...product,
      productId: product.id, // store productId separately
      userId: user.id,
      quantity: 1,
    };

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        const savedItem = await res.json();
        setCart((prev) => [...prev, savedItem]);
        alert(`${product.title?.substring(0, 25)} added to cart ✅`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (id) => {
    try {
      await fetch(`${API_URL}/cart/${id}`, { method: "DELETE" });
      setCart((prev) => prev.filter((item) => item.id !== id));
      alert("❌ Item removed from cart");
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  // ✅ Increase / Decrease quantity (in UI only)
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Logout (set isLoggedIn to false)
  const logout = async () => {
    if (user) {
      await fetch(`${API_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLoggedIn: false }),
      });
    }
    setUser(null);
    setCart([]);
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        updateCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        logout,
        loadUser, // ✅ expose for manual refresh after login
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MyContextProvider;
