import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
       

        <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-lg shadow mt-4 mr-8 ml-auto">

  {/*  time display */}
  <div className="mt-2 text-center">
    <p className='font-bold'>{currentTime.toLocaleTimeString()}</p>
  </div>
</div>

 {/*  Mark the Atten */}
 <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg mt-16 shadow mx-auto">
  <h1 className='text-2xl  text-center'>Mark your Attendance</h1>
</div>

      
    <div class="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow mt-16 mr-2 ml-auto">
  <div className="mt-1">
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