import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Adminnavbar from './Component/Adminnavbar'
import Navbar from './Component/Navbar'

function Allusers() {

const [users,setusers] = useState([]);

const  fetchData = async() =>{

      try {
        const data = await axios.get("http://localhost:5000/api/users/getallusers");
        setusers(data.data)
      } catch (error) {
        console.log(error)
      }  
};

useEffect(()=>{
  fetchData();
},[]);


  return (
    <div className='bg-wight-green'>
        <div className="flex">
      {/* Side Navigation */}
      <Adminnavbar />

      <div className="flex flex-col w-full">
        {/* Top Navigation */}
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
       
        
        <div className="flex justify-center items-center h-full">
        
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              image
            </th>
            <th scope="col" className="px-6 py-3">
              roll
            </th>
            <th scope="col" className="px-6 py-3">
             Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && 
          users.map((users)=>(
          <tr className="bg-white dark:bg-table-row  hover:tablerow-hover dark:hover:bg-tablerow-hover">
            <td className="px-6 py-4 font-medium text-green-900 ">
            {users._id}
            </td>
            <td className="px-6 py-4 text-green-900">
              {users.name}
            </td>
            <td className="px-6 py-4 text-green-900">
              {users.email}
            </td>
            <td className="px-6 py-4 text-green-900">
              <img className='w-10 rounded-full '
              src={users.imageurl}
              alt='profile'
              />
            </td>
            <td className="px-6 py-4 text-green-900">
              {users.role}
            </td>
            <td className="px-6 py-4 text-right text-green-900">
            <Link to={`#`}>
                      <button className="btn1 mr-3"><GrUpdate    className="mr-5 text-lg" />
            </button>
            </Link> 
            <Link to={`#`}>
                      <button className="btn1  "><MdDeleteForever   className="mr-5 text-lg" />
            </button>
            </Link>  
          </td>
          </tr>
         ))}
        </tbody>
      </table>
      
    </div>
    
    </div>
    <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br><br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
       
       
    </div>
    </div>
    </div>
  )
}

export default Allusers