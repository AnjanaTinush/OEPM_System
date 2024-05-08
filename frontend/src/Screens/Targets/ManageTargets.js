import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Adminnavbar from "./Component/Adminnavbar";

function ManageTargets() {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [formErrors, setFormErrors] = useState({
    type: "",
    quantity: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
      const formData = new FormData(e.target);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log(formDataObject);
      target();
    } else {
      console.log("Form validation failed");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      type: "",
      quantity: "",
      date: "",
    };

    if (!type) {
      errors.type = "Please select type";
      isValid = false;
    }

    if (!quantity) {
      errors.quantity = "Please enter the quantity";
      isValid = false;
    } else if (isNaN(quantity)) {
      errors.quantity = "Quantity must be a number";
      isValid = false;
    }

    if (!date) {
      errors.date = "Please select a date";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

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

  // Fetch items from inventory
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inventory/getallitems"
        );
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  // Store targets
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/target/getalltargets"
        );
        setTargets(data.data);
      } catch (error) {
        console.log(error);
      }
    };

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
            <div className="shadow-2xl sm:rounded-lg pl-8 pr-8 pt-4 ">
              <h2 className="text-xl font-semibold text-dark font-custom">
                Enter the target Details
              </h2>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-4">
                  <select
                    className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Item type</option>
                    {items.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.type && (
                    <span className="text-red-500">{formErrors.type}</span>
                  )}
                </div>
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Enter Capacity (in Kg)"
                    className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {formErrors.quantity && (
                    <span className="text-red-500">{formErrors.quantity}</span>
                  )}
                </div>
                <div className="mt-4">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                    placeholderText="Enter date"
                  />
                  {formErrors.date && (
                    <span className="text-red-500">{formErrors.date}</span>
                  )}
                </div>
                <div className="mt-8 mb-2">
                  <button
                    type="submit"
                    //  class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-8 dark:bg-dark dark:hover:bg-darkhover "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg mb-8">
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
                           {index + 1}
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
