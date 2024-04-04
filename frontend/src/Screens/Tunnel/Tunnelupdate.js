import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Component/Adminnavbar'
import Navbar from '../Component/Navbar'
import { useParams } from "react-router-dom";

const Tunnelupdate =() => {

    // const handleRoleChange = (e) => {
    //     setroll(e.target.value);
    //   };
    
      
    const { tunnelid } = useParams();
    
    const [temperature,settemperature]=useState('');
    const [humidity,sethumidity]=useState('');
    const [capacity,setcapacity]=useState('');
    const [plantType,setplantType]=useState('');
       
    
    useEffect(() => {
      async function gettunnel() {
        try {
    
          
            const response = (await axios.post(`http://localhost:5000/api/tunnel/gettunnel/${tunnelid}`)).data;
         
          console.log(response.Tunnel);
    
          settemperature(response.Tunnel.temperature);
          sethumidity(response.Tunnel.humidity); // Corrected typo here
          setcapacity(response.Tunnel.capacity);
          setplantType(response.Tunnel.plantType);
    
        } catch (error) {
          
          console.log(error);
        }
      }
      gettunnel();
    }, [])

    //updateTunnel
async function Updatetunnel(e){

    e.preventDefault();
    
    const updatetunnel={
        temperature,
        humidity,
        capacity,
        plantType
    }
  
    try {
      
      const response = (await axios.put(`http://localhost:5000/api/tunnel/updatetunnel/${tunnelid}`,updatetunnel)).data;
      console.log(response);
      
      window.location.href='/t_tunnels';
  
    } catch (error) {
      
      console.log(error);
    }
  }

  return (
    <div className="bg-wight-green">
      <Adminnavbar />
      <Navbar />
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-3xl mt-32 p-6">
      <h2 className="text-xl font-semibold text-dark font-custom  ">
                    Enter the Tunnel Details
                  </h2>
        <form  className="mt-8">
          <div>
          <input
              type="number"
              value={temperature}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                settemperature(e.target.value)
            }}
            />
          </div>
          <div className="mt-4">
          <input
              type="number"
              value={humidity}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                sethumidity(e.target.value)
            }}
            />
          </div>
          <div className="mt-4">
          <input
              type="number"
              value={capacity}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                setcapacity(e.target.value)
            }}
            />
          </div>
          <div className="mt-4">
          <input
              type="text"
              value={plantType}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                setplantType(e.target.value)
            }}
            />
          </div>
          <div className="mt-8 mb-2">
            <button
              type="submit"
              onClick={Updatetunnel}
              className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
              
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tunnelupdate;