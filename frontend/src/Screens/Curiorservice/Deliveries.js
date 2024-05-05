import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";

function Deliveries() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);

  useEffect(() => {
    fetchOrderDetails();
    fetchDriverDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get("/api/orderdetails/getalldeliveries");
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  const fetchDriverDetails = async () => {
    try {
      const response = await axios.get("/api/drivers/getalldrivers");
      setDriverDetails(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  

  return (
    <div
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <AdminNavbar />
      <Navbar />

      <h1 className="flex justify-center text-5xl font-semibold ml-44 p-8 font-serif text-green-800">
        Delivery details
      </h1>

      <div className="flex justify-center items-center">
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
          <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Delivery ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Tracking Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Vehicle Number
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((order) => {
                const driver = driverDetails.find(
                  (driver) => driver.availability === "Available"
                );
                return (
                  <tr key={order._id}>
                    <td className="px-6 py-4 font-medium text-green-900">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-900">
                      765876
                    </td>
                    <td className="px-6 py-4 font-medium text-green-900">
                      {order.firstName}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-900">
                      {order.contactNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-900">
                      {order.streetAddress}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-900">
                    {driver ? driver.name : ""}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-900">
                      {driver ? driver.vehicalnum : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Deliveries;
