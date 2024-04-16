import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Component/Adminnavbar'
import { useParams } from "react-router-dom";
import Greenhouse from '../../Images/Greenhouse.jpg'

const Tunnelupdate =() => {
      
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
          sethumidity(response.Tunnel.humidity); 
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
    <div className="flex">
      <Adminnavbar />
      <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl mt-10 p-6" style={{ display: 'flex' }}>
      <div className="flex-1 mr-6">
      <img src={Greenhouse} alt="Image" className="w-full h-auto rounded-xl mr-4" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
          <div className="flex-1" style={{ margin: '0 2rem' }}>
        <form  className="mt-2">
        <h2 className=" font-bold text-dark text-2xl font-custom  ">
                     Update Tunnel Details
                  </h2>
        <div className="flex flex-col mt-6">
    <label htmlFor="temperature" className="text-gray-700 font-bold mb-2">Enter the updated Temperature</label>
          <input
              type="number"
              value={temperature}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                settemperature(e.target.value)
            }}
            />
          </div>
          <div className="flex flex-col mt-4">
    <label htmlFor="humidity" className="text-gray-700 font-bold mb-2">Enter the updated Humidity</label>
          <input
              type="number"
              value={humidity}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                sethumidity(e.target.value)
            }}
            />
          </div>
          <div className="flex flex-col mt-4">
    <label htmlFor="capacity" className="text-gray-700 font-bold mb-2">Enter the updated Capacity</label>
          <input
              type="number"
              value={capacity}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            onChange={(e)=>{
                setcapacity(e.target.value)
            }}
            />
          </div>
          <div className="flex flex-col mt-4">
    <label htmlFor="capacity" className="text-gray-700 font-bold mb-2">Enter the updated Plant Type</label>
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
              className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover transition-transform duration-300 ease-in-out transform hover:scale-105"
              
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
</div>
      </div>
      </div>

    </div>
  )
}

export default Tunnelupdate;