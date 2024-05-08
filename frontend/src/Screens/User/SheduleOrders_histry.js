import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import Loader from "../../Component/Loader";

function SheduleOrders_histry() {
  const [sheduleorders, setsheduleorders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const currentUser = JSON.parse(localStorage.getItem("currentuser"));
      const data = await axios.post(
        "http://localhost:5000/api/scheduleOrder/getsheduleorderroute",
        { userid: currentUser._id }, // Pass the correct user ID here
       
      );
      setsheduleorders(data.data.orders); // Access data.data.orders instead of data.orders
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center ml-10 text-4xl italic text-green-900">
        Employee leave Request
      </h1>
      <div className="flex justify-center items-center h-full mt-3">
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16">
          <table
            data-aos="zoom out"
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  No
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {sheduleorders && sheduleorders.length > 0 ? (
                sheduleorders.map((order, index) => (
                  <tr key={order.id} className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover">
                    <td className="px-6 py-4 font-medium text-green-900 text-center">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-green-900 text-center">{order.itemName}</td>
                    <td className="px-6 py-4 text-green-900 text-center">{order.price}</td>
                    <td className="px-6 py-4 text-green-900 text-center">{order.quantity}</td>
                    <td className="px-6 py-4 text-green-900 text-center">{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-green-900 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SheduleOrders_histry;
