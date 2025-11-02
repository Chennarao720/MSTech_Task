import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditAdress = () => {
  let { id } = useParams()
  const navigate = useNavigate()

  let [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    area: "",
    pincode: ""
  })

  let handlechange = (e) => {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  let handlesubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        window.alert("Address updated successfully")
        navigate("/address")
      } else {
        window.alert("Something went wrong while updating")
      }
    } catch (error) {
      console.log("Error updating data:", error)
      window.alert("Something went wrong")
    }
  }

  let fetchdata = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`)
      if (res.ok) {
        const result = await res.json()
        setData(result)
      } else {
        console.log("Error fetching data")
      }
    } catch (error) {
      console.log("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [id])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handlesubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Address
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handlechange}
          value={data.name}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          onChange={handlechange}
          value={data.mobile}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handlechange}
          value={data.email}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          name="area"
          placeholder="Area"
          onChange={handlechange}
          value={data.area}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          onChange={handlechange}
          value={data.pincode}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditAdress
