import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Component/Loader";

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getallorders"
        );
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white">
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
                            First Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Last Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Contact Number
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Street Address
                          </th>
                          <th scope="col" className="px-6 py-3">
                            City
                          </th>
                          <th scope="col" className="px-6 py-3">
                            District
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Postal Code
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Item Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Item ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            User ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Total Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Image URL
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {orderDetails.map((order) => (
                          <tr
                            key={order._id}
                            className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                          >
                            <td className="px-6 py-4">{order.orderID}</td>
                            <td className="px-6 py-4">{order.firstName}</td>
                            <td className="px-6 py-4">{order.lastName}</td>
                            <td className="px-6 py-4">{order.email}</td>
                            <td className="px-6 py-4">{order.contactNumber}</td>
                            <td className="px-6 py-4">{order.streetAddress}</td>
                            <td className="px-6 py-4">{order.city}</td>
                            <td className="px-6 py-4">{order.district}</td>
                            <td className="px-6 py-4">{order.postalCode}</td>
                            <td className="px-6 py-4">{order.itemName}</td>
                            <td className="px-6 py-4">{order.itemid}</td>
                            <td className="px-6 py-4">{order.userid}</td>
                            <td className="px-6 py-4">{order.quantity}</td>
                            <td className="px-6 py-4">{order.price}</td>
                            <td className="px-6 py-4">{order.totalprice}</td>
                            <td className="px-6 py-4">{order.imageurl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
