import React, { useState, useEffect } from "react";
import AdprofileNavbar from "./Component/AdprofileNavbar";
import moment from "moment";
import { DatePicker } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../Component/Loader";
import { Tag } from "antd";

const { RangePicker } = DatePicker;

function Requestedleave() {
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [desription, setDescription] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const filterByDate = (dates) => {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
  };

  const leaverequest = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Validate form inputs
    if (!fromdate || !todate || !desription) {
      Swal.fire("Oops!", "Please fill in all fields.", "error");
      return; // Stop execution if validation fails
    }

    const currentuser = JSON.parse(localStorage.getItem("currentuser"));
    const requestDetails = {
      userid: currentuser._id,
      fromdate: fromdate,
      todate: todate,
      desription: desription,
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "/api/leaves/leaverequest",
        requestDetails
      );
      Swal.fire("Success!", "Leave request sent successfully.", "success").then(
        () => {
          window.location.reload();
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Error!", "Failed to send leave request.", "error");
    }
  };

  //read relavent leave requested
  const fetchData = async () => {
    try {
      setLoading(true);
      const currentUser = JSON.parse(localStorage.getItem("currentuser"));
      const data = await axios.post("/api/leaves/getleaverequestedbyuserid", {
        userid: currentUser._id,
      });
      setLeaves(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-wight-green">
            <div className="flex">
              <AdprofileNavbar />
              <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
                <div className="flex max-w-2xl bg-gray-200 border rounded-3xl px-2 mx-auto mt-16 ">
                  <form
                    className="flex items-center w-full"
                    action="leaverequest"
                  >
                    <RangePicker
                      format="DD-MM-YYYY"
                      onChange={filterByDate}
                      className="rounded-3xl"
                      required
                    />
                    <input
                      type="text"
                      className="w-1/3 border-none py-2 px-3 mb-3 mt-3 mr-4 ml-4 h-8 rounded-3xl"
                      placeholder="Enter your reason"
                      value={desription}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-white hover:bg-gray-100 text-gray-800 font-light py-0 px-2 border rounded-3xl h-9 w-40 shadow transition-transform duration-300 ease-in-out transform hover:scale-110"
                      onClick={leaverequest}
                    >
                      Send Request
                    </button>
                  </form>
                </div>

                <div className="flex justify-center items-center  h-full mt-10 mb-4">
                  <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                      <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green ">
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
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaves.map((leave) => (
                          <tr
                            key={leave.id}
                            className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover mb-4"
                          >
                            <td className="px-6 py-4 font-medium text-green-900">
                              {leave._id}
                            </td>
                            <td className="px-6 py-4 text-green-900">
                              {leave.fromdate}
                            </td>
                            <td className="px-6 py-4 text-green-900">
                              {leave.todate}
                            </td>
                            <td className="px-6 py-4 text-green-900">
                              {leave.desription}
                            </td>

                            <td className="px-6 py-4 text-green-900">
                              {leave.status === "Pending" ? (
                                //display status according to approveable

                                <Tag color="blue">Pending</Tag>
                              ) : leave.status === "Approved" ? (
                                <Tag color="green">Approve</Tag>
                              ) : (
                                <Tag color="red">Rejected</Tag>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Requestedleave;
