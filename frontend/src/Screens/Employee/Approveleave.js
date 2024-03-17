import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";
import Adminnavbar from './Component/Adminnavbar'
import Navbar from '../Component/Navbar'



function Approveleave() {

    const [approveleaves,setapproveleaves] = useState([]);

    //read data
const  fetchData = async() =>{
   

      try {
        const data = await axios.get("http://localhost:5000/api/leaves/getallleaves");
        setapproveleaves(data.data)
        
      } catch (error) {
        console.log(error)
      }  
};

useEffect(()=>{
  fetchData();
},[]);



  return (
    <div>
        <Adminnavbar/>
        <Navbar/>


        <div className="flex justify-center items-center ml-48 mr-10 h-full mt-10">      
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-green-900 dark:text-wight-green">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              From Date
            </th>
            <th scope="col" className="px-6 py-3">
              To Date
            </th>
            <th scope="col" className="px-6 py-3">
              Reason
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            
            
          </tr>
        </thead>
       
        <tbody>
          {approveleaves.length > 0 &&
           approveleaves.map((approveleaves)=>(
          <tr className="bg-white dark:bg-table-row  hover:tablerow-hover dark:hover:bg-tablerow-hover">
            <td className="px-6 py-4 font-medium text-green-900 ">
           {approveleaves._id}
            </td>
            <td className="px-6 py-4 text-green-900">
            {approveleaves.fromdate}
            </td>
            <td className="px-6 py-4 text-green-900">
              {approveleaves.todate}
            </td>
            <td className="px-6 py-4 text-green-900">
              {approveleaves.desription}
            </td>
            <td className="px-6 py-4 text-green-900">
             {approveleaves.status}
            </td>
           
           
          </tr>
         ))}
        </tbody>
       
      </table>

    </div>
    
    </div>

    </div>
  )
}

export default Approveleave