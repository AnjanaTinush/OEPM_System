import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Component/Adminnavbar';
import { Link } from 'react-router-dom';
import TunnelDetails from './Component/Tunneldetails';

function Tunnelprofile() {
  const [tunnels, setTunnels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTunnel, setSelectedTunnel] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tunnel/getalltunnels');
      setTunnels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCapacity = async (tunnelId, newCapacityInput) => {
    const currentTunnel = tunnels.find((tunnel) => tunnel._id === tunnelId);

    if (!currentTunnel || isNaN(newCapacityInput)) {
      console.error("Invalid tunnel or new capacity input");
      return;
    }

    let updatedCapacity = 0; // Initialize updatedCapacity variable

    if (currentTunnel.currentCapacity) {
      // If currentCapacity exists, sum with new input
      updatedCapacity = currentTunnel.currentCapacity + parseInt(newCapacityInput);
    } else {
      // If currentCapacity doesn't exist, set new input as the capacity
      updatedCapacity = parseInt(newCapacityInput);
    }

    // Check if updatedCapacity exceeds the tunnel's capacity
    if (updatedCapacity >= currentTunnel.capacity) {
      setErrorMessage("current capacity exceeds or equals the tunnel's maximum capacity");
      window.alert(errorMessage); // Display error message as an alert
      return;
    } else {
      setErrorMessage('current capacity is exceeding the maximum capacity'); // Clear error message if capacity is valid
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/tunnel/updatecurrentcapacity/${tunnelId}`, {
        currentCapacity: updatedCapacity,
      });
      console.log(response.data);
      fetchData(); // Fetch updated data after successful update
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTunnels = tunnels.filter(
    (tunnel) =>
      tunnel.plantType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tunnel.temperature.toString().includes(searchQuery) ||
      tunnel.humidity.toString().includes(searchQuery) ||
      tunnel.capacity.toString().includes(searchQuery)
  );

  const data = filteredTunnels.map((tunnel, index) => [
    index + 1,
    tunnel.temperature,
    tunnel.humidity,
    tunnel.capacity,
    tunnel.plantType,
  ]);

  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
          <h1 className="text-3xl font-bold text-center ml-7 mt-6 text-green-900 font-custom">
            Tunnel Profiles
          </h1><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">

          {filteredTunnels.map((tunnel, index) =>  (
              <div key={tunnel._id} className="bg-white shadow-lg rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-900">{tunnel.plantType}</h3>
                  <p className="text-gray-500">ID: {index + 1}</p>
                  <p className="text-gray-500">Temperature: {tunnel.temperature}°C</p>
                  <p className="text-gray-500">Humidity: {tunnel.humidity}%</p>
                  <p className="text-gray-500">Maximum Capacity: {tunnel.capacity}</p>
                  <p className="text-gray-500">Current Capacity: {tunnel.currentCapacity}</p>
                  <div className="relative pt-1 px-5 mt-5">
                    <div className="flex mb-2 items-center justify-between ">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                          {Math.round((tunnel.currentCapacity / tunnel.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600">
                          Capacity
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200 ">
                      <div
                        style={{ width: `${Math.round((tunnel.currentCapacity / tunnel.capacity) * 100)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 "
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-10">

                    <input
                      type="number"
                      placeholder="Enter New Capacity"
                      className="form-input border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green px-3 py-1 mr-3"
                      value={tunnel.newCapacity || ''}
                      onChange={(e) =>
                        setTunnels((prevState) =>
                          prevState.map((item) =>
                            item._id === tunnel._id ? { ...item, newCapacity: e.target.value.trim() } : item
                          )
                        )
                      }
                    />
                    <button
                      className="bg-whatsapp-green text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-transform duration-300 ease-in-out transform hover:scale-110"
                      onClick={() => handleUpdateCapacity(tunnel._id, tunnel.newCapacity)}
                    >
                      Update Capacity
                    </button>
                  </div>
                  <button
        className="bg-whatsapp-green text-white px-3 py-1 mt-3 rounded-lg hover:bg-green-700 transition-transform duration-300 ease-in-out transform hover:scale-110"
        onClick={() => setSelectedTunnel(tunnel)}
      >
        View Details
      </button>
                </div>
              </div>
            ))}
          </div>
          {selectedTunnel && (
  <TunnelDetails tunnel={selectedTunnel} onClose={() => setSelectedTunnel(null)} />
)}
        </div>
      </div>
    </div>
  );
}

export default Tunnelprofile;
