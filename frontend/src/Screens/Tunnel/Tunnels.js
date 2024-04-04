import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";
import { useReactToPrint } from "react-to-print"; 

function Tunnels() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [tunnels, setTunnels] = useState([]);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const componentPDF= useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/tunnel/getalltunnels");
      setTunnels(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteTunnel(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tunnel/delete/${id}`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const generatePDF = useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle:"Tunneldata",
    onafterprint:()=>alert("Data saved in PDF")

  })


  // Filter tunnels based on search query
  const filteredTunnels = tunnels.filter((tunnel) =>
    tunnel.plantType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    const tunnelData = {
      temperature,
      humidity,
      capacity,
      plantType,
    };

    console.log(tunnelData);
    
    try {
      const result = await axios.post("http://localhost:5000/api/tunnel/t_register", tunnelData);
      window.location.reload();
      console.log(result.data);
      alert("Tunnel added Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full">
          <Navbar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className="flex justify-center items-center h-full">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg">
              <div className="mb-2 shadow-2xl ">
                <input
                  type="text"
                  className="form-input w-full border border-gray-300 rounded-lg px-5 py-2 shadow-2xl sm:rounded-full"
                  placeholder="Search tunnels by plant type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div ref={componentPDF} style={{width:'100%'}}>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                      Capacity
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
                  {filteredTunnels.map((tunnel,index) => (
                    <tr key={tunnel._id} className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover">
                      {/* <td className="px-6 py-4 font-medium text-green-900">{tunnel._id}</td> */}
                      <td className="px-6 py-4 font-medium text-green-900">{index +1 }</td>
                      <td className="px-6 py-4 font-medium text-green-900">{tunnel.temperature}</td>
                      <td className="px-6 py-4 font-medium text-green-900">{tunnel.humidity}</td>
                      <td className="px-6 py-4 font-medium text-green-900">{tunnel.capacity}</td>
                      <td className="px-6 py-4 font-medium text-green-900">{tunnel.plantType}</td>
                      <td className="px-6 py-4 text-right text-green-900">
                        <Link to={`/t_tunnelUpdate/${tunnel._id}`}>
                          <button className="btn1 mr-3"><FaEdit className="mr-5 text-xl" /></button>
                        </Link>
                        <Link to="#">
                          <button className="btn1" onClick={() => deleteTunnel(tunnel._id)}><MdDeleteForever className="mr-5 text-2xl" /></button>
                        </Link>
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
          <br />

          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              onClick={openModal}
            >
              Click Here to Add a Tunnel
            </button>
          </div>

          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              onClick={generatePDF}
            >
              PDF
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
              <div ref={modalRef} className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-md">
                <div className="px-12 py-12">
                  <span className="close absolute top-0 right-0 mt-2 mr-4 cursor-pointer" onClick={closeModal}>
                    &times;
                  </span>
                  <h2 className="text-xl font-semibold text-dark font-custom">Enter the Tunnel Details</h2>
                  <form onSubmit={handleSubmit} className="mt-8">
                    <div>
                      <input
                        type="number"
                        placeholder="Enter Temperature"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Humidity"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                        value={humidity}
                        onChange={(e) => setHumidity(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Capacity"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter Plant Type"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                        value={plantType}
                        onChange={(e) => setPlantType(e.target.value)}
                      />
                    </div>

                    <div className="mt-8 mb-2">
                      <button
                        type="submit"
                        className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
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

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
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

export default Tunnels;
