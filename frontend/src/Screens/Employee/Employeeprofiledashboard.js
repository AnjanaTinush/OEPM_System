import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AdprofileNavbar from './Component/AdprofileNavbar';
import clock from './image/clock.png';
import leave from './image/leave.png';
import Loader from "../../Component/Loader";


function Employeeprofiledashboard() {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false); // Define loading state variable here


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div>
      {loading ? (
                <Loader />
            ) : (<>

          
            <AdprofileNavbar />

<div className="p-2 ml-60 bg-white border border-gray-200 rounded-lg shadow m-1 relative">
  <div className="flex items-center">
    <img src={leave} alt="Logo" className="w-11 mt-1 ml-4" />
    <p className="ml-3 mt-1">
      Total Leaves : <span className="font-bold text-green-900">20</span>
    </p>
  </div>
  <div className="absolute top-0 right-0 p-5">
    <p className="text-whatsapp-green">{currentTime.toLocaleTimeString()}</p>
  </div>
</div>

<div className="flex justify-between items-start">
  <div className="ml-96  mt-32 bg-white border border-gray-200 rounded-lg shadow custom-height">
    {/* Live Calendar Display */}
    <Calendar
      value={date}
      onChange={setDate}
      className="w-full h-full "
    />
  </div>

  <div className="mt-20 mr-4 bg-white border border-gray-200 rounded-lg shadow h-96">
    <h1 className="mb-4 font-bold">
      CHECK IN & CHECK OUT Sri Lankan Standard Time
    </h1>
    <hr className="border-gray-200" />

    <div className="flex items-center ml-6">
      <button className="w-24 mt-16 ml-3">
        <p className="mt-2 text-whatsapp-green">
          {currentTime.toLocaleTimeString()}
        </p>
        <p className="ml-3 mt-4">Current In</p>
        <img src={clock} alt="Logo" />
      </button>
      <button className="w-24 mt-16 ml-32">
        <p className="mt-2 text-whatsapp-green">
          {currentTime.toLocaleTimeString()}
        </p>
        <p className="ml-3 mt-4">Current Out</p>
        <img src={clock} alt="Logo" />
      </button>
    </div>
  </div>
</div>
            </>)}
    </div>
  );
}

export default Employeeprofiledashboard;
