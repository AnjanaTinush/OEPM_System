import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import Datepicker CSS
import Adminnavbar from "./Component/Adminnavbar";


function ManageTargets() {


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    // closeModal(); 
  };



  const [type, settype] = useState("");
  const [quantity, setquantity] = useState("");
  const [date, setdate] = useState(""); // Initialize date state with current date

  async function target() {
    const target = {
      type,
      quantity,
      date,
    };

    console.log(target);
    
    try {
      const result = await axios.post(
        "http://localhost:5000/api/target/ta_target",
        target
        );
      window.location.reload();
      console.log(result.data);
      alert("Target added successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const [items, setItems] = useState([]);

const fetchItems = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/inventory/getallitems");
    setItems(response.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchItems();
}, []);


  const [targets, settargets] = useState([]);

  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/target/getalltargets"
      );
      settargets(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
            <h1 className="text-center text-3xl font-bold text-green-600 mt-8 mb-12 mr-32">
              Target List
            </h1>

            <div className="flex justify-between items-center px-44 ">
              <div className="   shadow-2xl sm:rounded-lg  pl-8 pr-8 pt-4 ">
               
                <h2 className="text-xl font-semibold text-dark font-custom  ">
                  Enter the target Details
                </h2>
                <form onSubmit={handleSubmit} className="mt-8">
                  
                  <div className="mb-4">
                  <select
  className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
  value={type}
  onChange={(e) => settype(e.target.value)}
>
  <option value="">Select Item type</option>
  {items.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
</select>

                </div>
                  <div className="mt-4">
                    <input
                      type="number"
                      placeholder="Enter Capacity (in Kg)"
                      className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                      value={quantity}
                      onChange={(e) => {
                        setquantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    {/* Use DatePicker  */}
                    <DatePicker
                      selected={date}
                      onChange={(date) => setdate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                      placeholderText="Enter date" 
                    />
                  </div>

                  <div className="mt-8 mb-2">
                    <button
                      type="submit"
                      className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-8 dark:bg-dark dark:hover:bg-darkhover"
                      onClick={target}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              
              
                <div className="overflow-x-auto shadow-2xl sm:rounded-lg  ">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green ">
                      <tr>
                        <th scope="col" className="px-8 py-3 ">
                          Target Id
                        </th>
                        <th scope="col" className="px-8 py-3">
                          Item Type
                        </th>
                        <th scope="col" className="px-8 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-8 py-3">
                          Date
                        </th>
                       
                    
                      </tr>
                    </thead>
                    <tbody>
                      {targets &&
                        targets.map((target, index) => {
                          return (
                            <tr 
                            key={target._id} 
                            className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                            >

                              <td className="px-8 py-4 font-medium text-green-900">
                              {index.toString().padStart(4, '0')} {/* Display target ID */}
                              </td>
                              <td className="px-8 py-4 font-medium text-green-900">
                                {target.type}
                              </td>
                              <td className="px-8 py-4 font-medium text-green-900">
                                {target.quantity}
                              </td>
                              <td className="px-8 py-4 font-medium text-green-900">
                                {new Date(target.date).toLocaleDateString()}
                              </td>

                              
                              
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTargets;