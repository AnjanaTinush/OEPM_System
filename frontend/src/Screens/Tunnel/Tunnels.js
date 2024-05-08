import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Adminnavbar from "./Component/Adminnavbar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Tunnels() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [tunnels, setTunnels] = useState([]);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/tunnel/getalltunnels"
      );
      setTunnels(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteTunnel(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tunnel/delete/${id}`
      );
      console.log(response);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tunnel deleted successfully',
      });
      fetchData();
    } catch (error) {
      console.log(error);
    MySwal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete tunnel',
    });
    }
  }

  // Filter tunnels based on search query
  const filteredTunnels = tunnels.filter(
    (tunnel) =>
      tunnel.plantType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tunnel.temperature.toString().includes(searchQuery) ||
      tunnel.humidity.toString().includes(searchQuery) ||
      tunnel.capacity.toString().includes(searchQuery)
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any input field is empty
    if (!temperature || !humidity || !capacity || !plantType) {
      return;
    }

    if (temperature > 100 || humidity < 0 || humidity > 100) {
      alert("Please enter valid values for temperature and humidity.");
      return;
    }

    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    closeModal();
  };

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plantType, setPlantType] = useState("");

  async function addTunnel() {
    // Check if any input field is empty
    if (!temperature || !humidity || !capacity || !plantType) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields.',
      });
      return;
    }

    if (temperature > 100 || humidity < 0 || humidity > 100) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter valid values for temperature and humidity.',
      });
      return;
    }

    const tunnelData = {
      temperature,
      humidity,
      capacity,
      plantType,
    };

    console.log(tunnelData);

    try {
      const result = await axios.post(
        "http://localhost:5000/api/tunnel/t_register",
        tunnelData
      );
      console.log(result.data);
    MySwal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Tunnel added successfully',
    });
    window.location.reload();
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add tunnel',
      });
    }
  }

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const pdfName = `Tunnels_Report_${currentDate}.pdf`; // Dynamically generate PDF name

    // Add title and date to the report
    doc.setFontSize(20);
    doc.text("Tunnels Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated at: ${new Date().toLocaleString()}`, 20, 30);

    // Add tunnels data to a customizable table
    let startY = 40;
    const tableHeaders = [
      "Tunnel ID",
      "Temperature",
      "Humidity",
      "Max Capacity",
      "Plant Type",
    ];
    const data = filteredTunnels.map((tunnel, index) => [
      index + 1,
      tunnel.temperature,
      tunnel.humidity,
      tunnel.capacity,
      tunnel.plantType,
    ]);

    doc.autoTable({
      startY,
      head: [tableHeaders],
      body: data,
    });

    // Add total count of tunnels
    const totalCount = filteredTunnels.length;
    doc.text(
      `Total Tunnels: ${totalCount}`,
      20,
      doc.autoTable.previous.finalY + 10
    );

    // Save the PDF with the dynamic file name
    doc.save(pdfName);
  };

  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
          <h1 className="text-3xl font-bold text-center ml-7 mt-6 text-green-900 font-custom">
            Tunnel Management
          </h1>
          <div
            className="flex justify-between items-center p-6"
            style={{ paddingTop: "4rem", paddingBottom: "0.5rem" }}
          >
            <div className="relative">
              <input
                type="text"
                className="form-input border border-gray-300 rounded-lg px-12 py-2 pl-10 shadow-2xl sm:rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                placeholder="Search tunnels by plant type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "400px" }}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <AiOutlineSearch className="text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={openModal}
              >
                Click Here to Add a Tunnel
              </button>

              <button
                type="button"
                onClick={generatePDFReport}
                className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Create Report
              </button>
            </div>
          </div>

          <div
            style={{ width: "100%", paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            <table className="w-full text-sm text-center  rtl:text-right text-gray-500 dark:text-gray-400  rounded-xl overflow-hidden">
              <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tunnel ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Temperature
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Humidity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Maximum Capacity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Plant Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTunnels.map((tunnel, index) => (
                  <tr
                    key={tunnel._id}
                    className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                  >
                    <td className="px-10 py-4 font-medium text-green-900">
                      {index + 1}
                    </td>
                    <td className="px-10 py-4 font-medium text-green-900">
                      {tunnel.temperature} °C
                    </td>
                    <td className="px-10 py-4 font-medium text-green-900">
                      {tunnel.humidity} %
                    </td>
                    <td className="px-10 py-4 font-medium text-green-900">
                      {tunnel.capacity}
                    </td>
                    <td className="px-10 py-4 font-medium text-green-900">
                      {tunnel.plantType}
                    </td>
                    <td className="px-10 py-4 text-center text-green-900 flex justify-center">
                      <Link
                        to={`/t_tunnelUpdate/${tunnel._id}`}
                        className="mr-3"
                      >
                        <button
                          className="btn1"
                          style={{ marginRight: "1rem" }}
                        >
                          <FaEdit className="mr-5 text-xl" />
                        </button>
                      </Link>
                      <Link
                        to="#"
                        onClick={() => deleteTunnel(tunnel._id)}
                        className="ml-3"
                      >
                        <button className="btn1" style={{ marginLeft: "1rem" }}>
                          <MdDeleteForever className="mr-5 text-2xl text-red-800" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                  <h2 className="text-xl font-semibold text-dark font-custom">
                    Enter the Tunnel Details
                  </h2>
                  <form onSubmit={handleSubmit} noValidate className="mt-8">
                    <div className="flex gap-4">
                      <div style={{ width: "250px" }}>
                        <input
                          type="number"
                          placeholder="Enter Temperature (°C)"
                          className="mt-1 p-2 block w-full required rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                          value={temperature}
                          onChange={(e) => setTemperature(e.target.value)}
                          required // Added required attribute
                          max={100} // Added max attribute for temperature
                        />
                      </div>
                      <div style={{ width: "200px" }}>
                        <input
                          type="number"
                          placeholder="Enter Humidity"
                          className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                          value={humidity}
                          onChange={(e) => setHumidity(e.target.value)}
                          required // Added required attribute
                          min={0} // Added min attribute for humidity
                          max={100} // Added max attribute for humidity
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Capacity"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required // Added required attribute
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter Plant Type"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                        value={plantType}
                        onChange={(e) => setPlantType(e.target.value)}
                        required // Added required attribute
                      />
                    </div>
                    <div className="mt-8 mb-2">
                      <button
                        type="submit"
                        className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover transition-transform duration-300 ease-in-out transform hover:scale-105"
                        onClick={addTunnel}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tunnels;
