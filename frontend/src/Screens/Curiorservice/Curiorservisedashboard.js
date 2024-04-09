import React, { useEffect, useRef, useState } from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";
import Flexbox from "flexbox-react";
import { AiFillPieChart } from "react-icons/ai";
import Chart from "chart.js/auto";
import axios from "axios";

function Curiorservisedashboard() {
  const chartRef = useRef();
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/drivers/getalldrivers");
      const availableDrivers = response.data.filter(
        (driver) => driver.availability === "Available"
      );
      const unavailableDrivers = response.data.filter(
        (driver) => driver.availability === "Unavailable"
      );
      setAvailableCount(availableDrivers.length);
      setUnavailableCount(unavailableDrivers.length);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    renderPieChart();
  }, [availableCount, unavailableCount]);

  const renderPieChart = () => {
    const chartData = {
      labels: ["Available", "Unavailable"],
      datasets: [
        {
          label: "Driver Availability",
          data: [availableCount, unavailableCount],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
  
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      chartRef.current.chart = new Chart(chartRef.current, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Diver Availability",
              font: {
                size: 18
              }
            }
          },
        },
      });
    }
  };
  

  return (
    <div>
      <Adminnavbar />
      <Navbar />

      <div className="ml-64 p-10">
        <Flexbox className="flex justify-evenly p-5 gap-2 bg-justify-between ">
          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl ">
            Total Deliveries
            <br />
            <br />
            200
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>
          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl">
            Active Drivers
            <br />
            <br />
            {availableCount}/20
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>

          <Flexbox className=" bg-whatsapp-green rounded-lg shadow-2xl">
          
          <div className="flex justify-center items-center">
            
        <div className=" p-4 overflow-x-auto shadow-2xl sm:rounded-lg">
        
          <canvas ref={chartRef}></canvas>
          
        </div>
        
      </div>
      
          </Flexbox>

          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl">
            Ratings
            <br />
            <br />
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>
        </Flexbox>
      </div>

      

      
    </div>
  );
}

export default Curiorservisedashboard;
