import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "../Component/Navbar";
import Loader from "../../Component/Loader";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tag } from "antd";

AOS.init({
  duration: 2500,
});

function Approveleave() {
  const [approveleaves, setapproveleaves] = useState([]);
  const [loading, setloading] = useState(false);

  // Read all requested
  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/leaves/getallleaves"
      );
      setapproveleaves(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // create request disaprove function
  async function disapprove(requestid) {
    try {
      setloading(true);
      const result = await axios.post("/api/leaves/cancelrequest", {
        requestid,
      });
      console.log(result.data);
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your Leave Request  Rejected  Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("OOps", "Something went wrong", "error");
    }
  }
  //create request approve function

  async function approve(requestid) {
    try {
      setloading(true);
      const result = await axios.post("/api/leaves/approverequest", {
        requestid,
      });
      console.log(result.data);
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your Leave Request  Approved  Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("OOps", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <Adminnavbar />

      <h1 className="flex justify-center text-4xl italic mt-8 ml-20 text-green-900">
        Employee leave Request
      </h1>
      <div className="flex justify-center items-center ml-48 mr-10 mb-4 h-full mt-5">
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16">
          <table
            data-aos="zoom out"
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  id
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  From Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  To Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Reason
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              {approveleaves.length > 0 &&
                approveleaves.map((leave) => (
                  <tr
                    key={leave._id}
                    className="bg-white dark:bg-table-row  hover:tablerow-hover dark:hover:bg-tablerow-hover"
                  >
                    <td className="px-6 py-4 font-medium text-green-900 text-center">
                      {leave.userid}
                    </td>
                    <td className="px-6 py-4 text-green-900 text-center">
                      {leave.fromdate}
                    </td>
                    <td className="px-6 py-4 text-green-900 text-center">
                      {leave.todate}
                    </td>
                    <td className="px-6 py-4 text-green-900 text-center ">
                      {leave.desription}
                    </td>

                    <td className="px-6 py-4 text-green-900 text-center ">
                      {leave.status == "Pending" ? (
                        //if request not get action display action button
                        <>
                          <button
                            className="ml-2 bg-white hover:bg-gray-100 text-gray-800 font-light py-0 px-2 border  rounded-3xl h-6 shadow"
                            onClick={() => approve(leave._id)}
                          >
                            Approve
                          </button>

                          <button
                            className="ml-2 bg-white hover:bg-gray-100 text-gray-800 font-light py-0 px-2 border  rounded-3xl h-6 shadow"
                            onClick={() => disapprove(leave._id)}
                          >
                            Disapprove
                          </button>
                        </>
                      ) : (
                        //after get approve ble display status
                        <>
                          {leave.status === "Pending" ? (
                            <Tag color="blue">Pending</Tag>
                          ) : leave.status === "Approved" ? (
                            <Tag color="green">Approve</Tag>
                          ) : (
                            <Tag color="red">Rejected</Tag>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Approveleave;
