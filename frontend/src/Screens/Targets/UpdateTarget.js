import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from "./Component/Adminnavbar";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

const UpdateTarget = () => {
  const { targetid } = useParams();
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(""); 
    
  useEffect(() => {
    async function gettarget() {
      try {
        const response = (await axios.post(`http://localhost:5000/api/target/gettarget/${targetid}`)).data;
        setType(response.Target.type);
        setQuantity(response.Target.quantity); 
        setDate(response.Target.date);
      } catch (error) {
        console.log(error);
      }
    }
    gettarget();
  }, [])

  // Update Target
  async function updateTarget(e) {
    e.preventDefault();
    const updatedTarget = {
      type,
      quantity,
      date
    };
  
    try {
      const response = (await axios.put(`http://localhost:5000/api/target/updatetarget/${targetid}`, updatedTarget)).data;
      console.log(response);
      window.location.href = '/t_targets';
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-wight-green h-screen flex justify-center items-center">
      <Adminnavbar />
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-3xl p-6">
        <h2 className="text-xl font-semibold text-dark font-custom">Enter the Tunnel Details</h2>
        <form className="mt-8">
          <div className="mb-4">
            <select
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Item type</option>
              <option value="Tomato">Tomato</option>
              <option value="Bellpeper">Bellpeper</option>
              <option value="Cucumber">Cucumber</option>
              <option value="Cabbage">Cabbage</option>
            </select>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Capacity (in Kg)"
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              className="p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
              placeholderText="Enter date" 
            />
          </div>
          <div className="mt-8 mb-2">
            <button
              type="submit"
              className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
              onClick={updateTarget}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTarget;
