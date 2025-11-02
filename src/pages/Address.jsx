import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();
  const addressURL = "http://localhost:5000/users";

  // ✅ Fetch all addresses
  const fetchAddresses = async () => {
    try {
      const res = await fetch(addressURL);
      if (!res.ok) throw new Error("Failed to fetch addresses");
      const data = await res.json();
      setAddresses(data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ✅ Delete address
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${addressURL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting address");
    }
  };

  // ✅ Deliver
  const handleDeliver = (id) => {
    navigate(`/delivery/${id}`);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      

      {/* Add New Address */}
     
      {/* Address List */}
      <div className="mt-6 space-y-4 w-[70%] mx-auto">
        {addresses.length > 0 ? (
          addresses.map(({ name, email, mobile, area, pincode, id }) => (
            <div
              key={id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="address"
                  value={id}
                  onChange={() => setSelectedAddressId(id)}
                />
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              </div>

              <p className="text-gray-600">{email}</p>
              <p className="text-gray-700">
                {mobile} • {area} • {pincode}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-3">
                <button
                  onClick={() => navigate(`/dashboard/editaddress/${id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Delete
                </button>

                {selectedAddressId === id && (
                  <button
                    onClick={() => handleDeliver(id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Deliver Here
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No addresses found.</p>
        )}
      </div><br />
       <NavLink to="/dashboard/addnewaddress">
        <div className="w-[20%] bg-orange-400 text-white text-center rounded-[10px] p-[20px] m-auto cursor-pointer hover:bg-green-500 transition">
          + Add New Address
        </div>
      </NavLink>
    </>
  );
};

export default Address;
