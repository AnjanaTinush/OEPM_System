import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import AdminNavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";
import { CiSearch } from "react-icons/ci";
import Swal from "sweetalert2";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const componentPDF = useRef();
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/drivers/getalldrivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/drivers/delete/${id}`);
        setDrivers(drivers.filter((driver) => driver._id !== id));
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const generatePDF = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const printWindow = window.open("", "_blank", "width=600,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Drivers Report</title>
          <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }

          th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }

          th {
            background-color: #f2f2f2;
            color: #555;
            text-transform: uppercase;
          }

          tr:nth-child(even) {
            background-color: #f9f9f9;
          }

        </style>
        </head>
        <body>
          <h1>Drivers Report</h1>
          <p>Date: ${currentDate}</p>
          <p>Time: ${currentTime}</p>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Vehicle Number</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDrivers
                .map(
                  (driver, index) => `
                  <tr key=${driver._id}>
                    <td>${index + 1}</td>
                    <td>${driver.name}</td>
                    <td>${driver.email}</td>
                    <td>${driver.phone}</td>
                    <td>${driver.vehicalnum}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name &&
      driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex">
        
        <AdminNavbar />
        <div className="flex flex-col w-full">
          
          <Navbar />
          <div className="flex justify-between items-center ml-72 mb-4">
            
            <div className="relative">
              <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name..."
                className=" p-2 pl-10 block w-72 rounded-3xl bg-wight-green border-solid border-2 border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

            <Link to="/j_AddDriver">
              <button
                type="button"
                className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              >
                Click Here to Add a Driver
              </button>
            </Link>
          </div>

          <div className="flex justify-center items-center h-full">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
              <div ref={componentPDF} style={{ width: "100%" }}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                    <tr>
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
                          <Link to={`/j_updatedriver/${driver._id}`}>
                            <button className="btn1 mr-3">
                              <FaEdit className="mr-5 text-xl" />
                            </button>
                          </Link>
                          <button
                            className="btn1"
                            onClick={() => deleteDriver(driver._id)}
                          >
                            <MdDeleteForever className="mr-5 text-2xl" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Drivers;
