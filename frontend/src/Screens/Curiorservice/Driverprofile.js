import React, { useState } from "react";
import Flexbox from "flexbox-react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";

function Driverprofile() {

  
  // State driver availability
  const [availability, setAvailability] = useState("available");
  // State order status
  const [orderstatus, setOrderstatus] = useState("orderstatus");

  return (
    <div
      // Background 
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
        backgroundSize: "cover",
      }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans"
    >
      <div className=" bg-white p-8">
      
        {/* Profile welcome message */}
        <h1 className="text-center text-5xl font-semibold p-8 font-serif text-green-800">
          Hi *DriverName*, Welcome to your Profile page
        </h1>

        {/* Dashboard cards */}
        <Flexbox className="flex justify-evenly grow p-5 gap-auto ">
          {/* Total Deliveries card*/}
          <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
            Total Deliveries
            <br />
            <br />
            50
            <TbTruckDelivery className="w-20 h-20 ml-12 opacity-70 " />
          </Flexbox>
          {/* Total Deliveries This Month card*/}
          <Flexbox className=" p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
            Total Deliveries This Month
            <br />
            <br />
            20
            <MdCalendarMonth className="w-20 h-20 ml-12 opacity-70 " />
          </Flexbox>
          {/* Average Rating card*/}
          <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
            Average Rating
            <br />
            <br />
            5/5
            <MdOutlineStarRate className="w-20 h-20 ml-12 opacity-70 " />
          </Flexbox>
        </Flexbox>

        <div>
          <div className="flex gap-8">
            <div className="flex gap-8 grow flex-col">
              {/* Personal Information*/}
              <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
                <h2 className="text-2xl font-semibold  text-center">
                  Personal Information
                </h2>
                {/* Personal details */}
                <p className="text-lg mb-4">
                  <strong>Name:</strong> *Driver name*
                </p>
                <p className="text-lg mb-4">
                  <strong>Email:</strong> *Driver email*
                </p>
                <p className="text-lg mb-4">
                  <strong>Phone Number:</strong> *Driver phone number*
                </p>
                <p className="text-lg mb-4">
                  <strong>Vehicle Number:</strong> *driver vehical number*
                </p>
                <p className="text-lg mb-4">
                  <strong className="text-lg mb-4 ">Availability:</strong>{" "}
                  {availability}
                </p>
                {/* Update Availability */}
                <div className="p-4  bg-white">
                  <h2 className="text-xl font-semibold mb-4">
                    Update Availability
                  </h2>
                  {/* Dropdown availability */}
                  <select
                    className="border p-2 mb-4 rounded-lg border-black"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">
                    Update Availability
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col ">
              {/* Ongoing Delivery*/}
              <div className="p-4 border-2 size-full border-whatsapp-green rounded-lg shadow-2xl bg-green-100 ">
                <h1 className="text-xl text-center font-semibold mb-4">
                  Ongoing Delivery - 2024/04/25
                </h1>
                {/* Ongoing delivery details */}
                <p className="text-lg mb-4">
                  <strong>OrderID-</strong> *Order id*
                </p>
                <p className="text-lg mb-4">
                  <strong>Tracking Code-</strong> *Tracking numer*
                </p>
                <p className="text-lg mb-4">
                  <strong>Customer Name-</strong> *Customer name*
                </p>
                <p className="text-lg mb-4">
                  <strong>Phone Number-</strong> *customer phone number*
                </p>
                <p className="text-lg mb-4">
                  <strong>Address-</strong> *customer Address*
                </p>
                <p className="text-lg mb-4">
                  <strong>Status-</strong> {orderstatus}
                </p>
                {/* Update order status */}
                <div className="p-4  bg-green-100 mt-2">
                  <h2 className="text-xl font-semibold mb-4">
                    Update Order Status
                  </h2>
                  {/* Dropdown*/}
                  <select
                    className="border p-2 mb-4 rounded-lg border-black"
                    value={orderstatus}
                    onChange={(e) => setOrderstatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="Out Of Delivery">Out Of Delivery</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Delivery History */}
          <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white mt-8">
            <h2 className="text-xl font-semibold mb-4">Delivery History</h2>
            {/* Table*/}
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Delivery ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tracking code
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Delivery Address
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample delivery history row */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D001</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Delivered
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    1123456789
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    456 Road, Town
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    2024-04-10
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    4 Out Of 5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driverprofile;
