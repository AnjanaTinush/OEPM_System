import React, { useEffect, useState, useRef } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "../Component/Navbar";

function Drivers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    closeModal(); // Close the modal after form submission
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [vehicalnum, setvehicalnum] = useState("");

  async function driver() {
    const driver = { name, email, phone, vehicalnum };
    console.log(driver);

    try {
      const result = (
        await axios.post("http://localhost:5000/api/drivers/j_drivers", driver)
      ).data;
      console.log(result.data);
      alert("Driver added successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const [drivers, setdrivers] = useState([]);

  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/drivers/getalldrivers"
      );
      setdrivers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function deletedriver(id) {
    try {
      const response = (
        await axios.delete(`http://localhost:5000/api/drivers/delete/${id}`)
      ).data;
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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
            <button
              type="button"
              class="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              onClick={openModal}
            >
              Click Here to Add a Driver
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
              <div
                ref={modalRef}
                className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-md"
              >
                <div className="px-12 py-12">
                  <span
                    className="close absolute top-0 right-0 mt-2 mr-4 cursor-pointer"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <h2 className="text-xl font-semibold text-dark font-custom  ">
                    Enter the Driver Details
                  </h2>
                  <form onSubmit={handleSubmit} className="mt-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Phone Number"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={phone}
                        onChange={(e) => {
                          setphone(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Vehical Number"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={vehicalnum}
                        onChange={(e) => {
                          setvehicalnum(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-8 mb-2">
                      <button
                        type="submit"
                        className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
                        onClick={driver}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center h-full">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
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
                      Vehical Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {drivers &&
                    drivers.map((driver) => {
                      return (
                        <tr className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover">
                          <td className="px-6 py-4 font-medium text-green-900 ">
                            {driver._id}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900 ">
                            {driver.name}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900 ">
                            {driver.email}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900 ">
                            {driver.phone}
                          </td>
                          <td className="px-6 py-4 font-medium text-green-900 ">
                            {driver.vehicalnum}
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
                                onClick={(e) => deletedriver(driver._id)}
                              >
                                <MdDeleteForever className="mr-5 text-2xl " />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
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
