import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addnewadress = () => {
  let navigate = useNavigate()

  let [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    area: "",
    pincode: ""
  })

  let handlechange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  let handlesubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })

      if (res.ok) {
        alert("Added successfully")
        navigate("/address")
      } else {
        alert("Failed to add address")
      }
    } catch (error) {
      console.log("Error adding address:", error)
      alert("Something went wrong")
    }
  }

  return (
    <>
      <form
        onSubmit={handlesubmit}
        className="w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 m-auto mt-6 border border-gray-200"
      >
        <input
          onChange={handlechange}
          value={state.name}
          type="text"
          name="name"
          placeholder="Enter Your Name"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
        />

        <input
          onChange={handlechange}
          value={state.email}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
        />

        <input
          onChange={handlechange}
          value={state.mobile}
          type="tel"
          name="mobile"
          placeholder="Enter Your Mobile Number"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
        />

        <input
          onChange={handlechange}
          value={state.area}
          type="text"
          name="area"
          placeholder="Enter Your Area"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
        />

        <input
          onChange={handlechange}
          value={state.pincode}
          type="number"
          name="pincode"
          placeholder="Enter Your Pincode"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
        />

        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default Addnewadress
