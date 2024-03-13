import React, { useState, useEffect } from "react";
import AdprofileNavbar from './Component/AdprofileNavbar'
import Navbar from '../Component/Navbar'
import moment from "moment"
import { DatePicker, Space } from 'antd';
import axios from "axios";
const { RangePicker } = DatePicker;




function Requestedleave() {

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const[desription , setdesription]=useState('')
  

  function filterByDate(dates){
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
    
    
    }

    async function leaverequest(){

      const requestdetails={

        userid:JSON.parse(localStorage.getItem("currentuser"))._id,
        fromdate,
        todate,
        desription
      }

      try {
        const result = await axios.post("/api/leaves/leaverequest",requestdetails)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
        <Navbar/>
        <AdprofileNavbar/>

        <div class="max-w-2xl bg-white border border-gray-200 rounded-lg px-2 mx-auto mt-16 mr-60">
    <form class="flex items-center w-full">
        <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate}/>

        <input
            type="text"
            className="w-1/3 border rounded py-2 px-3 mb-3 mt-2 mr-4 ml-4"
            placeholder="Enter your reason"
            value={desription} // Binding the input value to the state
            onChange={(e) => setdesription(e.target.value)} // Updating the state on change
          />
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
        onClick={(e)=>leaverequest(e)}>
            send request
        </button>
    </form>
</div>



    </div>
  )
}

export default Requestedleave