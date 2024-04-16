import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from "./Component/Adminnavbar";

import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker

const UpdateTarget =() => {

    // const handleRoleChange = (e) => {
    //     setroll(e.target.value);
    //   };
    
      
    const { targetid } = useParams();
    
    const [type, settype] = useState("");
    const [quantity, setquantity] = useState("");
    const [date, setdate] = useState(""); 
       
    
    useEffect(() => {
      async function gettarget() {
        try {
    
          
            const response = (await axios.post(`http://localhost:5000/api/target/gettarget/${targetid}`)).data;
         
          console.log(response.Tunnel);
    
          settype(response.Target.type);
          setquantity(response.Target.quantity); // Corrected typo here
          setdate(response.Target.date);
         
    
        } catch (error) {
          
          console.log(error);
        }
      }
      gettarget();
    }, [])

    //updateTunnel
async function Updatetarget(e){

    e.preventDefault();
    
    const updatetarget={
        type,
      quantity,
      date
    }
  
    try {
      
      const response = (await axios.put(`http://localhost:5000/api/target/updatetarget/${targetid}`,updatetarget)).data;
      console.log(response);
      
      window.location.href='/t_targets';
  
    } catch (error) {
      
      console.log(error);
    }
  }
  return (
    <div className="bg-wight-green">
      <Adminnavbar />
    
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-3xl mt-32 p-6">
      <h2 className="text-xl font-semibold text-dark font-custom  ">
                    Enter the Tunnel Details
                  </h2>
                  <form className="mt-8">
                  {/* <div>
                    <input
                      type="text"
                      placeholder="Enter Item type"
                      className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                      value={type}
                      onChange={(e) => {
                        settype(e.target.value);
                      }}
                    />
                  </div> */}
                  <div className="mb-4">
                  <select
                    className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                    value={type}
                    onChange={(e) => settype(e.target.value)}
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
                      onChange={(e) => {
                        setquantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    {/* Use DatePicker component */}
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
                      className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
                      onClick={Updatetarget}
                    >
                      Submit
                    </button>
                  </div>
                </form>
      </div>
    </div>
  )
}

export default UpdateTarget
