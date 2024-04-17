import React, { useEffect, useState, useRef } from "react";
import Adminnavbar from './Component/Adminnavbar';
import machine from './Images/machine.jpg';
import axios from 'axios';
import { FaShuttleVan } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import { GiCaravan } from "react-icons/gi";
import { GiAutoRepair } from "react-icons/gi";

function Machinedashboard() {
 

  const [chartData, setChartData] = useState({});

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/machines/getallmachines');
              const machines = response.data;

              // Process data to count vehicles by location
              const locations = {};
              machines.forEach(machine => {
                  const location = machine.location;
                  locations[location] = (locations[location] || 0) + 1;
              });

              // Prepare data for chart
              const chartData = {
                  labels: Object.keys(locations),
                  datasets: [{
                      label: 'Number of Vehicles',
                      data: Object.values(locations),
                      backgroundColor: '#a3e635',
                      borderColor: '#a3e635' ,
                      borderWidth: 3
                  }]
              };

              setChartData(chartData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);


  return (
    <div className="flex">
    <Adminnavbar />
    <div className="flex flex-col   w-full" style={{ zIndex: 900 }}>
      <div
        className="flex justify-between items-center p-12"
        style={{ paddingTop: "2rem", paddingBottom: "0.5rem" }}
      >
        {/*Top of cards*/}
        <div className="flex flex-row justify-between w-full  ">
        <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
            Total Vehicals
          </h5>
          <div className="flex mt-5">
            <div>
              <FaShuttleVan className="w-10 h-10" />
            </div>
            <div>
              <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                60
              </p>
            </div>
          </div>
        </div>
        
        <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
            Total Machines
          </h5>
          <div className="flex mt-5">
            <div>
              <GiCaravan className="w-10 h-10" />
            </div>
            <div>
              <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                60
              </p>
            </div>
          </div>
        </div>
        <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
            pending repairs
          </h5>
          <div className="flex mt-5">
            <div>
              <GiAutoRepair className="w-10 h-10" />
            </div>
            <div>
              <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1 ">
                60
              </p>
            </div>
          </div>
        </div>


        
      </div>
      </div>
<div></div>

<div><h2 className="text-xl">Machine Locations vs Number of Vehicles</h2></div>
      <div className=" flex w-full h-4/6 ">
    
    {chartData.labels && chartData.datasets && (
        <Bar
            data={chartData}
            options={{
              indexAxis: 'y', 
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }}
        />
    )}
</div>


     
      </div>
        </div>
    
  );
}

export default Machinedashboard;
