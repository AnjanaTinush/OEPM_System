import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AdprofileNavbar from './Component/AdprofileNavbar';

import clock from './image/clock.png';
import leave from './image/leave.png';

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

       <div className="max-w-2lg p-2 bg-white border border-gray-200 rounded-lg shadow mt-4 mr-6 ml-64 relative">
  <div className="flex items-center"> 
    <img src={leave} alt="Logo" className='w-11 mt-1 ml-4' />
    <p className='ml-3 mt-1'>Total Leaves : <span className='font-bold text-green-900'>20</span></p> 
  </div>
  <div className="absolute top-0 right-0 p-5">
    <p className='text-whatsapp-green'>{currentTime.toLocaleTimeString()}</p>
  </div>

  
  {/*  time display */}
 
</div>

 {/*  Mark the Atten */}
 <div class="max-w-sm  bg-white border border-gray-200 rounded-lg mt-16 mr-6 h-80 shadow mx-auto">
 <h1 class=" mb-4 front-boald"><span class="font-bold">CHECK IN & CHECK OUT</span>  Sri Lankan Standard Time</h1> 

  <hr className=''/>
  
  <div class="flex items-center ml-6">
  <button class="w-24 mt-10 ml-3">
  <p class="mt-2 text-whatsapp-green ">{currentTime.toLocaleTimeString()}</p>
  <p class='ml-3 '>Current In</p>
  <img src={clock} alt="Logo" />
    
  </button>

  <button class="w-24 mt-10 ml-32">
  <p class="mt-2 text-whatsapp-green ">{currentTime.toLocaleTimeString()}</p>
  <p class='ml-3 '>Current Out</p>
  <img src={clock} alt="Logo" />
    
  </button>
</div>

</div>

<div className="max-w-xl p-12 bg-white border-2 border-gray-300 rounded-lg shadow fixed top-44 left-60 mt-4 ml-6" style={{ width: '1230px' }}>
  <div className="mt-4">
    <Calendar
      onChange={setDate}
      value={date}
      className="w-120 h-120 ml-12 " 
    />
  </div>
</div>



        </div>
  )
}

export default Employeeprofiledashboard