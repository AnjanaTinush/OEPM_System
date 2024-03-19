import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "../Component/Navbar";
import { useReactToPrint } from "react-to-print";
import { CiSearch } from "react-icons/ci";

function Drivers() {
  const componentPDF = useRef();
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/drivers/getalldrivers"
        );
        setDrivers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  async function deleteDriver(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/drivers/delete/${id}`
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-wight-green">
      <div className="flex">
        {/* Side Navigation */}
        <Adminnavbar />

        <div className="flex flex-col w-full">
          {/* Top Navigation */}
          <Navbar />
          <br></br>
          <br></br>

          <div className="flex justify-end items-center mr-20 h-full ">
            <Link to="/j_AddDriver">
              <button
                type="button"
                className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              >
                Click Here to Add a Driver
              </button>
            </Link>
          </div>

          <div className="ml-72 items-center mr-20 h-full mb-4 ">
            {/* Search input field */}
            <div className="relative ">
              <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 " />
              <input
                type="text"
                placeholder="Search by name..."
                className="mt-1 p-2 pl-10 block  w-72 rounded-3xl bg-wight-green border-solid border-2 border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center items-center h-full">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
              <div ref={componentPDF} style={{ width: "100%" }}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Driver ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Vehicle Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Availability
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDrivers.map((driver) => (
                      <tr
                        key={driver._id}
                        className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                      >
                        <td className="px-6 py-4 font-medium text-green-900">
                          {driver._id}
                        </td>
                        <td className="px-6 py-4 font-medium text-green-900">
                          {driver.name}
                        </td>
                        <td className="px-6 py-4 font-medium text-green-900">
                          {driver.email}
                        </td>
                        <td className="px-6 py-4 font-medium text-green-900">
                          {driver.phone}
                        </td>
                        <td className="px-6 py-4 font-medium text-green-900">
                          {driver.vehicalnum}
                        </td>
                        <td className="px-6 py-4 font-medium text-green-900">
                          {driver.availability}
                        </td>

                        <td className="px-6 py-4 text-right text-green-900">
                          <Link to="#">
                            <button className="btn1 mr-3">
                              <FaEdit className="mr-5 text-xl" />
                            </button>
                          </Link>

                          <Link to="#">
                            <button
                              className="btn1"
                              onClick={() => deleteDriver(driver._id)}
                            >
                              <MdDeleteForever className="mr-5 text-2xl" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center h-full mt-8">
            <button
              type="button"
              className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              onClick={generatePDF}
            >
              Generate Report
            </button>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Drivers;
