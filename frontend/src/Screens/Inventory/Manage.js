import React, { useState, useRef, useEffect } from "react";
import Adminnavbar from "./Component/Adminnavbar";

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

import axios from "axios";

function Manage() {
  const ComponentPDF = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Define modalRef

  const [searchKey, setSearchKey] = useState("");
  const [duplicateitem, setduplicateitem] = useState([]);
  const [itemExists, setItemExists] = useState(false);




  

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    if (isHistoryModalOpen) {
      closeHistoryModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const [actionType, setActionType] = useState("");
  const [changedItem, setChangedItem] = useState("");

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Function to open the new modal
  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
    if (isModalOpen) {
      closeModal();
    }
  };

  // Function to close the new modal
  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  // Function to handle the form submission for logging history
  const handleHistorySubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission goes here
  };



  //addhistory
  const handleSubmit = async () => {
    try {
        console.log("Submitting form with actionType:", actionType, "and changedItem:", changedItem);
        const response = await axios.post("/api/inventory/addhistory", { actionType, changedItem });
        console.log("Response from backend:", response.data);
        // Your logic to submit original form goes here

        // Open the history modal after successful submission
        openModal();
    } catch (error) {
        console.error("Error logging history:", error);
    }
};








  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [imageurl, setimageurl] = useState("");

  //add item
  async function item() {
    const newItem = {
      name,
      price,
      quantity,
      imageurl,
    };

    const itemExists = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (itemExists) {
      setItemExists(true);
    } else {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/inventory/additems",
          newItem
        );
        console.log(result.data);
        alert("Item added successfully");
        setItemExists(false);
        fetchData();
        setTimeout(() => {
          closeModal();
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    }
  }

  //read
  const [items, setitems] = useState([]);

  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/inventory/getallitems"
      );
      setitems(data.data);
      setduplicateitem(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete
  useEffect(() => {
    fetchData();
  }, []);

  async function deleteitem(id) {
    try {
      const response = (await axios.delete(
        `http://localhost:5000/api/inventory/delete/${id}`
      )).data;
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function filterBySearch() {
    const tempitem = duplicateitem.filter((items) =>
      items.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    setitems(tempitem);

    // Check if the filtered array is empty
    if (tempitem.length === 0) {
      toast.error("User not found.");
    }
  }

  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "Userdata",
  });

  return (
    <div className="bg-wight-green h-screen flex flex-col">
      <div className="flex">
        {/* Admin Navbar */}
        <Adminnavbar />

        <div className="flex flex-col w-full">
          {/* Top Navigation */}
          <br />
          <br />
          <br />

          {/* Main Content */}
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search Items"
              className="p-3 pl-6 rounded-3xl  border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
              style={{
                width: "775px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                marginRight: "40px",
              }}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={filterBySearch}
            />
            <button
              type="button"
              className="text-white dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600/20 font-light rounded-full text-2xl px-6 py-4 text-center me-2 mb-2  dark:whatsapp-green   font-sans shadow-md"
              onClick={openHistoryModal}
              style={{ borderRadius: "50%" }}
            >
              +
            </button>
          </div>

          <div className="flex justify-center items-center h-full mt-10">
            <div className="overflow-x-auto shadow-xl sm:rounded-lg">
              <div ref={ComponentPDF} style={{ width: "100%" }}>
                <table
                  className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  style={{ width: "100%", height: "700px" }}
                >
                  <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-green-600 dark:text-wight-green">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Image URL
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.map((item) => (
                        <tr
                          className="bg-white dark:hover:bg-tablerow-hover"
                          key={item._id}
                        >
                          <td className="px-6 py-4 font-medium text-green-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900">
                            {item.price}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900">
                            <img
                              className="w-10 rounded-full "
                              src={item.imageurl}
                              alt="profile"
                            />
                          </td>
                          <td className="px-6 py-4 text-right text-green-900">
                            <Link to={`/i_update/${item._id}`}>
                            <button
  className="btn1 mr-3"
  onClick={(e) => {
    openHistoryModal();
    // Add any other actions you want to perform on click
  }}
>
  <FaEdit className="mr-5 text-xl" />
</button>
                            </Link>
                            <Link to="#">
                            <button
                              className="btn1"
                              onClick={(e) => {
                              deleteitem(item._id);
                              openHistoryModal();
          }}
         >
    <MdDeleteForever className="mr-5 text-2xl" />
  </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="text-white mt-5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600/20 font-light rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green font-sans shadow-md focus:border-transparent transition-all duration-700"
              onClick={generatePDF}
            >
              Export as PDF
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
              <div ref={modalRef} className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-md">
                <div className="px-12 py-12">
                  <span className="close absolute top-0 right-0 mt-2 mr-4 cursor-pointer" onClick={closeModal}>
                    &times;
                  </span>
                  <h2 className="text-xl font-semibold text-dark font-custom">Enter New Item Details</h2>
                  <form className="mt-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter name"
                        required
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-noneborder-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Price"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-noneborder-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
                        required
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Quantity"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-noneborder-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
                        required
                        value={quantity}
                        onChange={(e) => setquantity(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter Image URL"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-noneborder-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
                        required
                        value={imageurl}
                        onChange={(e) => setimageurl(e.target.value)}
                      />
                      <div className="mt-8 mb-2">
                        {itemExists && (
                          <p className="text-red-500">The item already exists.</p>
                        )}
                        <button
                          type="submit"
                          className="text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out block w-full focus:outline-none font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-700 dark:hover:bg-green-800"
                          onClick={item}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

{isHistoryModalOpen && (
  <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-md">
      <div className="px-12 py-12">
        <span className="close absolute top-0 right-0 mt-2 mr-4 cursor-pointer" onClick={closeHistoryModal}>&times;</span>
        <h2 className="text-xl font-semibold text-dark font-custom text-center">History Log</h2>
        <form className="mt-8 w-80 text-center">
          <div className="mx-auto">
            {/* Action Type Dropdown */}
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
            >
              <option value="">Select Action Type</option>
              <option value="update">Update</option>
              <option value="add">Add</option>
              <option value="delete">Delete</option>
            </select>
          </div>
          <div className="mt-4 mx-auto">
            {/* Item Name Dropdown */}
            <select
              value={changedItem}
              onChange={(e) => setChangedItem(e.target.value)}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent transition-all duration-700 outline-none"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item._id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-8 mb-2">
            <button
              type="button" // Changed type to "button" to prevent form submission
              className="text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out block w-full focus:outline-none font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-700 dark:hover:bg-green-800"
              onClick={handleSubmit} // Updated onClick to handleSubmit
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Manage;
