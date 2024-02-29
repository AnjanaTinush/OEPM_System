import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Component/Adminnavbar'
import Navbar from './Component/Navbar'
import { useParams } from "react-router-dom";


const Userupdate =() => {

const { userid } = useParams();

const [name,setname]=useState('');
const [email,setemail]=useState('');
const [role,setroll]=useState('');
   
useEffect(() => {
  async function getUser() {
    try {
      const response = (await axios.post(`http://localhost:5000/api/users/getuser/${userid}`)).data;
      console.log(response.user);

      setname(response.user.name);
      setemail(response.user.email); // Corrected typo here
      setroll(response.user.role);

    } catch (error) {
      console.log(error);
    }
  }
  getUser();
}, [])

//updateuser
async function Updateuser(e){

  e.preventDefault();
  
  const updateuser={
    name,
    email,
    role
  }

  try {
    const response = (await axios.put(`http://localhost:5000/api/users/updateuser/${userid}`,updateuser)).data;
    console.log(response);
    window.location.href='/e_allusers';

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
                    Update user details
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
              value={email}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
              onChange={(e)=>{
                setemail(e.target.value)
              }}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={role}
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
              onChange={(e)=>{
                setroll(e.target.value)
              }}
            />
          </div>
          
          <div className="mt-8 mb-2">
            <button
              type="submit"
              onClick={Updateuser}
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

export default Userupdate;