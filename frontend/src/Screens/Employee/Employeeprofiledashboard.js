import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AdprofileNavbar from './Component/AdprofileNavbar';

function Employeeprofiledashboard() {

  const [date, setDate] = useState(new Date());

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every time

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [])

  return (
    <div>
        <Navbar/>
       <AdprofileNavbar/>

        <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-lg shadow mt-2  mr-8 ml-auto">

  {/*  time display */}
  <div className=" text-center ">
    <p className='font-bold'>{currentTime.toLocaleTimeString()}</p>
  </div>
</div>

 {/*  Mark the Atten */}
 <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg mt-12 shadow mx-auto">
  <h1 className='text-2xl  text-center font-bold'>Mark your Attendance</h1>

  <div class="flex items-center">
  <button class="relative w-0 h-0 border-t-[20px] border-t-transparent border-l-[20px] border-l-green-900 border-b-[20px] border-b-transparent cursor-pointer mt-4 ml-12">
    <p class='ml-3 font-bold'>In</p>
  </button>

  <div class="border-t border-green-900 h-[20px] mx-4"></div>

  <p class="font-bold  items-center ml-12 py-4 mt-3 ">{currentTime.toLocaleTimeString()}</p>

  <div class="border-t border-green-900 h-[20px] mx-4"></div>

  <button class="w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-green-900 border-b-[20px] border-b-transparent ml-22 mt-4">
    <p class='ml-8 font-bold'>Out</p>
  </button>
</div>
</div>
      
    <div class="max-w-sm  bg-white border border-gray-200 rounded-lg shadow  mr-2 ml-auto ">
  <div className="mt-1 ">
    <Calendar
      onChange={setDate}
      value={date}
      className="w-16 text-xs" // Adjust width and text size as needed
    />
  </div>
</div>


        </div>
  )
}

export default Employeeprofiledashboard