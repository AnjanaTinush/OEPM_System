import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AdprofileNavbar from "./Component/AdprofileNavbar";
import Loader from "../../Component/Loader";
import { GiExitDoor } from "react-icons/gi";
import { LuAlarmClock } from "react-icons/lu";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import clock from "./image/clock.png";

function Employeeprofiledashboard() {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false); // Define loading state variable here
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  

  const user = JSON.parse(localStorage.getItem("currentuser"));
  const userId=user._id;
  // Inside the useEffect for userId
useEffect(() => {
  fetchLeaveCounts(userId);
}, [userId]); // Add userId as a dependency to useEffect

// Inside the fetchLeaveCounts function
const fetchLeaveCounts = async (userId) => {
  if (!userId) return; // Return if userId is empty

  try {
    const response = await fetch(`http://localhost:5000/api/leaves/leaverequestcounts/${userId}`); // Include userId in the URL
    const data = await response.json();
    console.log("API response:", data); // Log the API response for debugging

    setPendingLeaves(data.pending);
    setApprovedLeaves(data.approved);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching leave counts:", error);
    setLoading(false);
  }
};



  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="bg-wight-green">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex">
            <AdprofileNavbar />
            <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
              <div
                className="flex justify-between items-center p-12"
                style={{ paddingTop: "2rem", paddingBottom: "0.5rem" }}
              >
                {/*Top of cards*/}
                <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
                    Total Leaves
                  </h5>
                  <div className="flex mt-5">
                    <div>
                      <GiExitDoor className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                        {approvedLeaves}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
                    Pending Leaves
                  </h5>
                  <div className="flex mt-5">
                    <div>
                      <FaPersonCircleQuestion className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                        {pendingLeaves}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
                    Works Hours
                  </h5>
                  <div className="flex mt-5">
                    <div>
                      <LuAlarmClock className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                        60
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center p-12"
                style={{ paddingTop: "4rem", paddingBottom: "0.5rem" }}
              >
                {/*Calander*/}
                <div>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="w-96 h-80 text-xl rounded-lg shadow-xl border-whatsapp-green transition-transform duration-300 ease-in-out transform hover:scale-110" // Tailwind CSS classes for width, height, rounded corners, and no border
                  />
                </div>
                {/*Attendance mark*/}
                <div>
                  <div className=" mr-4 bg-white border border-gray-200 rounded-lg shadow-xl h-80">
                    <h1 className=" font-bold p-3">
                      CHECK IN & CHECK OUT Sri Lankan Standard Time
                    </h1>
                    <hr className="border-gray-200" />

                    <div className="flex items-center ml-6 ">
                      <button className="w-24 mt-12 ml-3 transition-transform duration-300 ease-in-out transform hover:scale-110">
                        <p className="mt-2 ml-2 text-whatsapp-green">
                          {currentTime.toLocaleTimeString()}
                        </p>
                        <p className="ml-3 ">Current In</p>
                        <img src={clock} alt="Logo" />
                      </button>
                      <button className="w-24 mt-12 ml-36 transition-transform duration-300 ease-in-out transform hover:scale-110">
                        <p className="mt-2 ml-2 text-whatsapp-green">
                          {currentTime.toLocaleTimeString()}
                        </p>
                        <p className="ml-3 ">Current Out</p>
                        <img src={clock} alt="Logo" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Employeeprofiledashboard;
