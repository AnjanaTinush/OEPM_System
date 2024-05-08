import React from 'react';
import Tunnel from '../../../Images/tunnel.png';

const TunnelDetails = ({ tunnel, onClose }) => {
  const calculateProgress = () => {
    if (!tunnel.currentCapacity || !tunnel.capacity) {
      return 0;
    }
    return (tunnel.currentCapacity / tunnel.capacity) * 100;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg " style={{ width: '500px' }}>
        <h2 className="text-lg text-center font-semibold text-green-900 mb-4">{tunnel.plantType} Tunnel Details</h2>

        <div className="relative pt-1 px-5 mt-5">
          {/* Image container */}
          <div className="relative h-64 w-full mb-4 overflow-hidden">
            {/* Image */}
            <img src={Tunnel} alt="Tunnel Image" className="absolute inset-0 w-full h-full object-cover" />
            {/* Progress bar */}
            <div
              style={{ width: '80%', /* Adjust width percentage as needed */ }}
              className="absolute bottom-7 left-9 h-32 text-xs flex rounded bg-white bg-opacity-85"
            >
              <div
                style={{ width: `${Math.round(calculateProgress())}%`  }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-whatsapp-green"
              ></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                {Math.round(calculateProgress())}%
              </span>
            </div>
          </div>
        </div>

        <p>Temperature: {tunnel.temperature}°C</p>
        <p>Humidity: {tunnel.humidity}%</p>
        <p>Maximum Capacity: {tunnel.capacity}</p>
        <p>Current Capacity: {tunnel.currentCapacity}</p>
        
        {/* Add other details as needed */}
        <button className="bg-red-500 text-white px-3 py-1 mt-6 rounded-lg hover:bg-red-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TunnelDetails;
