import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Loader from "../../Component/Loader";

function Employeeattendance() {
  const [attendanceIn, setAttendanceIn] = useState([]);
  const [attendanceOut, setAttendanceOut] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersMap, setUsersMap] = useState({}); // State to store user details

  useEffect(() => {
    fetchDataIn();
    fetchDataOut();
  }, []);

  const fetchDataIn = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/attendanceIn/getalllmarkIn"
      );
      const usersData = await axios.get("http://localhost:5000/api/users/getallusers");

      const users = usersData.data.reduce((acc, user) => {
        acc[user._id] = user.name; // Map userid to user's name
        return acc;
      }, {});
      setUsersMap(users);
      setAttendanceIn(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchDataOut = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/attendanceOut/getalllmarkOut"
      );
      setAttendanceOut(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to calculate time difference including seconds
  const calculateTimeDifference = (startTime, endTime) => {
    const start = new Date(`01/01/2020 ${startTime}`);
    const end = new Date(`01/01/2020 ${endTime}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <div className="">
        <Adminnavbar />
        <div className="flex flex-col w-full  " style={{ zIndex: 900 }}>
          <div>
            <div className="flex justify-center items-center mt-5 ml-52">
              <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-3">
                <thead>
                  <h1 className="flex justify-center text-4xl italic mt-2 mb-2 ml-32 text-green-900">
                    Employee Attendance
                  </h1>
                </thead>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        In Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Out Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Work Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceIn.map((attendanceInItem, index) => {
                      const correspondingOutTime = attendanceOut[index]
                        ? attendanceOut[index].outtime
                        : "";

                      const workHours =
                        correspondingOutTime &&
                        attendanceInItem.intime &&
                        calculateTimeDifference(
                          attendanceInItem.intime,
                          correspondingOutTime
                        );

                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover mb-4"
                        >
                          <td className="px-6 py-4 font-medium text-green-900">
                            {usersMap[attendanceInItem.userid]}
                          </td>
                          <td className="px-6 py-4 text-green-900">
                            {attendanceInItem.date}
                          </td>
                          <td className="px-6 py-4 text-green-900">
                            {attendanceInItem.intime}
                          </td>
                          <td className="px-6 py-4 text-green-900">
                            {correspondingOutTime}
                          </td>
                          <td className="px-6 py-4 text-green-900">
                            {workHours}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employeeattendance;
