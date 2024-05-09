import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2"; // Import SweetAlert
import AdprofileNavbar from "./Component/AdprofileNavbar";
import Loader from "../../Component/Loader";
import { GiExitDoor } from "react-icons/gi";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import clock from "./image/clock.png";

function Employeeprofiledashboard() {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [rejectLeaves, setRejectLeaves] = useState(0);

  const user = JSON.parse(localStorage.getItem("currentuser"));
  const userId = user._id;

  useEffect(() => {
    fetchLeaveCounts(userId);
  }, [userId]);

  const fetchLeaveCounts = async (userId) => {
    if (!userId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/leaves/leaverequestcounts/${userId}`
      );
      const data = await response.json();
      console.log("API response:", data);
      setPendingLeaves(data.pending);
      setApprovedLeaves(data.approved);
      setRejectLeaves(data.dissapproved)

      setLoading(false);
    } catch (error) {
      console.error("Error fetching leave counts:", error);
      setLoading(false);
    }
  };

  const handleMarkIn = async () => {
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentuser"));

      const response = await axios.post(
        "http://localhost:5000/api/attendanceIn/mark_in",
        {
          userid: currentUser._id,
          intime: currentTime.toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        }
      );

      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(response.data);
      setLoading(false);
      Swal.fire("Success", "Marked in successfully!", "success"); // SweetAlert success message
    } catch (error) {
      console.error("Error marking in:", error);
      setLoading(false);
    }
  };

  const handleMarkOut = async () => {
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentuser"));

      const response = await axios.post(
        "http://localhost:5000/api/attendanceOut/mark_out",
        {
          userid: currentUser._id,
          outtime: currentTime.toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        }
      );

      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(response.data);
      setLoading(false);
      Swal.fire("Success", "Marked out successfully!", "success"); // SweetAlert success message
    } catch (error) {
      console.error("Error marking out:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
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
                    Rejected leaves
                  </h5>
                  <div className="flex mt-5">
                    <div>
                      <FaRegTimesCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                       {rejectLeaves}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center p-12"
                style={{ paddingTop: "4rem", paddingBottom: "0.5rem" }}
              >
                <div>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="w-96 h-80 text-xl rounded-lg shadow-xl border-whatsapp-green transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div>
                  <div className=" mr-4 bg-white border border-gray-200 rounded-lg shadow-xl h-80">
                    <h1 className=" font-bold p-3">
                      CHECK IN & CHECK OUT Sri Lankan Standard Time
                    </h1>
                    <hr className="border-gray-200" />

                    <div className="flex items-center ml-6 ">
                      <button onClick={handleMarkIn} className="w-24 mt-12 ml-3 transition-transform duration-300 ease-in-out transform hover:scale-110">
                        <p className="mt-2 ml-2 text-whatsapp-green">
                          {currentTime.toLocaleTimeString()}
                        </p>
                        <p className="ml-3 ">Current In</p>
                        <img src={clock} alt="Logo" />
                      </button>
                      <button onClick={handleMarkOut} className="w-24 mt-12 ml-36 transition-transform duration-300 ease-in-out transform hover:scale-110">
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
