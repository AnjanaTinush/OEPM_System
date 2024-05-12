import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Loader from "../../Component/Loader";
import { Tag } from "antd";


const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [userCounter, setUserCounter] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/scheduleOrder/getallorders"); 
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDone = async (orderId) => {
    try {
      // Call the backend API to mark the order as done
      await axios.post(`/api/scheduleOrder/markOrderAsDone/${orderId}`);
      // Update the status in the local state
      const updatedOrderDetails = orderDetails.map(order => {
        if (order._id === orderId) {
          return { ...order, status: "Done" };
        }
        return order;
      });
      setOrderDetails(updatedOrderDetails);
    } catch (error) {
      console.error("Error marking order as done:", error);
    }
  };

  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full">
          <h1 className="text-center text-3xl font-bold text-green-600 mt-8 mr-32">
            Order Details
          </h1>
          <div className="flex justify-center items-center h-full mt-16 mb-16 mr-12">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Item Name
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Price
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((order, index) => (
                    <tr
                      key={order._id}
                      className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                    >
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {index + 1}
                      </td> {/* Display sequential numbering */}
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {/* Display user ID only if it's the first occurrence */}
                        {userCounter[order.userid]
                          ? userCounter[order.userid]
                          : (userCounter[order.userid] = Object.keys(userCounter).length + 1)}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {order.itemName}
                      </td>
                      {/* <td className="px-6 py-4 font-medium text-green-900 ">
                        {order.price}
                      </td> */}
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {new Date(order.date).toLocaleDateString()}
                      </td> {/* Format Date */}
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        <button
                          onClick={() => handleDone(order._id)}
                          className={`py-2 px-4 rounded ${
                            order.status === "Done"
                              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                          }`}
                          disabled={order.status === "Done"}
                        >
                          {order.status === "Done" ? "Done" : "Mark as Done"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
