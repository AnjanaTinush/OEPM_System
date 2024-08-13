import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Loader from "../../Component/Loader";

export function MVehical() {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [harvestQuantity, setHarvestQuantity] = useState("");
  const [capacityPercentage, setCapacityPercentage] = useState(null);
  const [targetInfo, setTargetInfo] = useState([]);
  const [selectedTargetType, setSelectedTargetType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/machines/getallmachines");
        const vehicleMachines = response.data.filter(
          (machine) => machine.location === "Vehicle"
        );
        setVehicles(vehicleMachines);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle machines:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    setCapacityPercentage(null);
  };

  const handleHarvestQuantityChange = (event) => {
    setHarvestQuantity(event.target.value);
    setCapacityPercentage(null);
  };

  const handleTargetTypeChange = (event) => {
    setSelectedTargetType(event.target.value);
  };

  const calculateCapacityPercentage = () => {
    if (selectedVehicle && harvestQuantity) {
      const selectedMachine = vehicles.find(
        (machine) => machine.name === selectedVehicle
      );

      if (selectedMachine) {
        const { capacity } = selectedMachine;
        const percentage = (harvestQuantity / capacity) * 100;
        setCapacityPercentage(percentage.toFixed(2));

        // After calculating capacity percentage, trigger sending email
        sendEmail(selectedTargetType, selectedVehicle, percentage.toFixed(2));
      }
    }
  };

  const sendEmail = async (targetType, vehicle, percentage) => {
    try {
      await axios.post("/api/sendEmail", {
        targetType,
        vehicle,
        percentage,
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };

  useEffect(() => {
    const fetchApprovedTargets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/target/getalltargets"
        );

        // Filter the response data to include only items with status "Approved"
        const approvedTargets = response.data.filter(
          (target) => target.status === "Approved"
        );

        setTargetInfo(approvedTargets);
      } catch (error) {
        console.error("Error fetching approved targets:", error);
      }
    };

    fetchApprovedTargets();
  }, []);

  return (
    <div>
      <div className="bg-wight-green">
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-wight-green">
            <div className="flex">
              {/* Side Navigation */}
              <Adminnavbar />
              <div className="flex flex-row justify-between w-full h-4/5 bg-green-800">
                <div className="grid grid-cols-3 w-full h-4/5">
                  <div className="...">
                    <div className="col-span-1">
                      <label htmlFor="vehicleSelect" className="text-white">
                        Select Vehicle:
                      </label>
                      <select
                        id="vehicleSelect"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        value={selectedVehicle}
                        onChange={handleVehicleChange}
                      >
                        <option value="">Select a vehicle...</option>
                        {vehicles.map((machine) => (
                          <option key={machine._id} value={machine.name}>
                            {machine.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="harvestQuantity" className="text-white">
                        Enter Harvest Quantity:
                      </label>
                      <input
                        type="number"
                        id="harvestQuantity"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        value={harvestQuantity}
                        onChange={handleHarvestQuantityChange}
                      />
                    </div>
                    <div className="col-span-1">
                      {/* Add dropdown for selecting target type */}
                      <label htmlFor="targetType" className="text-white">
                        Select Target Type:
                      </label>
                      <select
                        id="targetType"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        value={selectedTargetType}
                        onChange={handleTargetTypeChange}
                      >
                        <option value="">Select a target type...</option>
                        {/* Populate options with available target types */}
                        {targetInfo.map((target) => (
                          <option key={target._id} value={target.type}>
                            {target.type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-8"
                        onClick={calculateCapacityPercentage}
                      >
                        Calculate & Send Email
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 bg-green-100">
                    {/* Display capacity percentage */}
                    {capacityPercentage !== null && (
                      <div className="col-span-2 bg-green-100 p-4">
                        <h2 className="text-black font-bold">
                          Capacity Percentage:
                        </h2>
                        <p className="text-gray-500">{capacityPercentage}%</p>
                      </div>
                    )}
                    {capacityPercentage !== null && (
                      <div className="col-span-3 relative">
                        <img
                          src="https://www.pngkey.com/png/full/171-1718475_delivery-truck-image-white-delivery-truck-clipart.png"
                          alt="Lorry"
                          className="w-45 h-auto"
                          style={{ marginBottom: "5px" }}
                        />
                        <div className="w-290px h-190px">
                          <div
                            className="absolute top-1 left-3 bg-green-500 w-290px h-190px"
                            style={{
                              width: `${capacityPercentage}%`,
                              height: "10px",
                              transition: "width 0.3s ease",
                            }}
                          />
                        </div>
                        <div className="absolute top-0 left-0 text-black font-bold text-lg flex items-center justify-center w-full h-full">
                          {capacityPercentage}%
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    {/* Display target information in a table */}
                    {targetInfo && targetInfo.length > 0 ? (
                      <div className="bg-green-100 p-4">
                        <h2>Latest Approved Target Information:</h2>
                        <table className="mt-4 w-3/5 border-collapse border border-green-900">
                          <thead>
                            <tr className="bg-green-200">
                              <th className="border border-green-900 p-2">
                                Type
                              </th>
                              <th className="border border-green-900 p-2">
                                Quantity
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {targetInfo.map((target) => (
                              <tr key={target._id} className="bg-white">
                                <td className="border border-green-900 p-2">
                                  {target.type}
                                </td>
                                <td className="border border-green-900 p-2">
                                  {target.quantity}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No approved targets found.</p>
                    )}
                  </div>
                  <div className="...">
                    <div className="grid grid-cols-3 w-full h-full">
                      {vehicles.map((vehicle) => (
                        <div
                          key={vehicle._id}
                          className="col-span-3 bg-green-50 p-4"
                        >
                          {/* Display vehicle details */}
                          <h2 className="text-black font-bold">
                            {vehicle.name}
                          </h2>
                          <p className="text-gray-300">
                            Capacity: {vehicle.capacity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
