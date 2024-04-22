import React, { useState,useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Adminnavbar from './Component/Adminnavbar';
import Navbar from '../Component/Navbar';
import axios from 'axios';

function Itemupdate() {
  const { itemid } = useParams();
  const [name,setname]=useState('');
  const [price,setprice]=useState('');
  const [quantity,setquantity]=useState('');
  const [imageurl,setimageurl]=useState('');

  useEffect(() => {
    async function getItem() {
      try {
  
       
        const response = (await axios.post(`http://localhost:5000/api/inventory/getitem/${itemid}`)).data;
        
        console.log(response.item);
  
        setname(response.item.name);
        setprice(response.item.price); // Corrected typo here
        setquantity(response.item.quantity);
        setimageurl(response.item.imageurl);
  
      } catch (error) {
        
        console.log(error);
      }
    }
    getItem();
  }, [])

  //updateitem
async function Updateitem(e){

  e.preventDefault();
  
  const updateitem={
      name,
      price,
      quantity,
      imageurl
  }

  try {
    
    const response = (await axios.put(`http://localhost:5000/api/inventory/updateitem/${itemid}`,updateitem)).data;
    console.log(response);
    
    window.location.href='/i_manage';

  } catch (error) {
    
    console.log(error);
  }
}

   
  return (
    <div className='bg-wight-green'>
      <div className="flex">
        {/* Side Navigation */}
        <Adminnavbar />

        <div className="flex flex-col w-full">
          {/* Top Navigation */}
          <Navbar />
          
          <div className="max-w-sm mx-auto bg-white shadow-xl rounded-3xl mt-28 p-6">
            <h2 className="text-xl font-semibold text-dark font-custom  ">
              Update item details
            </h2>
            <form  className="mt-8">
              <div>
                <input
                  type="text"
                  value={name}
                  className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  onChange={(e)=>{
                    setname(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  value={price}
                  className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  onChange={(e)=>{
                    setprice(e.target.value)
                  }}
                />
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={quantity}
                  className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  onChange={(e)=>{
                    setquantity(e.target.value)
                  }}
                />
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={imageurl}
                  className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  onChange={(e)=>{
                    setimageurl(e.target.value)
                  }}
                />
              </div>

              <div className="mt-8 mb-2">
                <button
                  type="submit"
                 onClick={Updateitem}
                  className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Itemupdate;
