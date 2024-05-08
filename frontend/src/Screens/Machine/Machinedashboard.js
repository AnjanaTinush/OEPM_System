import React, { useEffect, useState } from "react";
import Adminnavbar from "./Component/Adminnavbar";
import axios from "axios";
import { FaShuttleVan } from "react-icons/fa";
import { GiCaravan } from "react-icons/gi";
import { GiAutoRepair } from "react-icons/gi";
import { calculateNextRepairDate } from "./Machine";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";

function Machinedashboard() {
  const [loading, setLoading] = useState(false);
  const [filteredMachines, setFilteredMachines] = useState([]);
  
  const [machineCountsByLocation, setMachineCountsByLocation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/machines/getallmachines");
        const machines = response.data;

        // Filter machines based on remaining repair days
        const filteredMachines = machines.filter((machine) => {
          const { remainingDays } = calculateNextRepairDate(
            machine.lastRepairDate,
            machine.repairTimePeriod
          );
          return remainingDays <= 7;
        });

        setFilteredMachines(filteredMachines);

        // Calculate machine counts by location
        const countsByLocation = {};
        filteredMachines.forEach((machine) => {
          const location = machine.location;
          countsByLocation[location] = (countsByLocation[location] || 0) + 1;
        });
        setMachineCountsByLocation(countsByLocation);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the bar chart
  const locations = Object.keys(machineCountsByLocation);
  const machineCounts = Object.values(machineCountsByLocation);

  const chartData = {
    labels: locations,
    datasets: [
      {
        label: "Number of Machines",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(0,0,0,1)",
        data: machineCounts,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/machines/getallmachines"
        );
        const machines = response.data;

        // Filter machines based on remaining repair days
        const filteredMachines = machines.filter((machine) => {
          const { remainingDays } = calculateNextRepairDate(
            machine.lastRepairDate,
            machine.repairTimePeriod
          );
          return remainingDays <= 7;
        });

        setFilteredMachines(filteredMachines);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Adminnavbar />
      <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
        <div className="flex justify-between items-center p-12">
          {/* Top of cards */}
          <div className="flex flex-row justify-between w-full">
          <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
                Pending Repairs
              </h5>
              <div className="flex mt-5">
                <div>
                  <GiAutoRepair className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1">
                    {filteredMachines.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
                Total Machines
              </h5>
              <div className="flex mt-5">
                <div>
                  <GiCaravan className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1">
                    {filteredMachines.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="block w-50 h-32 p-5 bg-white border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-whatsapp-green">
                Total Vehicles
              </h5>
              <div className="flex mt-5">
                <div>
                  <FaShuttleVan className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-2xl font-normal text-gray-700 dark:text-gray-400 ml-10 mt-1">
                    60
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display filtered machines */}
      <div className="flex block">
        <div className="flex flex-col w-3/6 h-4/6 rounded-lg shadow-xl p-3">
           <div class="fixed sticky top-0">Upcoming Repairs</div>
      <div className="h-full overflow-y-scroll">
        {filteredMachines.map((machine) => (
          <div key={machine._id} className="w-full p-5 bg-Lime-100">
            <div className="bg-green-100 border border-gray-200 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 p-5 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold mb-2">{machine.name}</p>
                <p className="text-rose-600">
                  Remaining Days:{" "}
                  {calculateNextRepairDate(
                    machine.lastRepairDate,
                    machine.repairTimePeriod
                  ).remainingDays}
                </p>
              </div>
              <Link to={`/m_update/${machine._id}`}>
              <div>
                <GiAutoRepair className="w-10 h-10" />
              </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="block w-full h-80 inline p-10 h-5/6 ">
            <Bar
              data={chartData}
              options={{
                title: {
                  display: true,
                  text: "Machine Count by Location",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "top",
                },
              }}
            />
          </div>
        </div>
    

    </div>
      </div>
    
  );
}

export default Machinedashboard;
