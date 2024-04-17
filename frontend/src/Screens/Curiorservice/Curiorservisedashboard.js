import React, { useEffect, useRef, useState } from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";
import Flexbox from "flexbox-react";
import Chart from "chart.js/auto";
import axios from "axios";
import { BsCartCheck } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { PiClockCountdown } from "react-icons/pi";
import { TfiUser } from "react-icons/tfi";

function Curiorservisedashboard() {
  // Reference for chart
  const chartRef = useRef();

  // hold counts of available and unavailable drivers
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);

  // Fetch driver data component
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch driver data from database
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

  //  when available or unavailable change Render pie chart
  useEffect(() => {
    renderPieChart();
  }, [availableCount, unavailableCount]);

  // render the pie chart
  const renderPieChart = () => {
    const chartData = {
      labels: ["Available", "Unavailable"],
      datasets: [
        {
          label: "Driver Availability",
          data: [availableCount, unavailableCount],
          backgroundColor: ["#25D366", "#128C7E"],
          borderWidth: 0,
        },
      ],
    };

    // Destroy chart if exists
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create new pie chart
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
              text: "Driver Availability",
              font: {
                size: 18,
              },
            },
          },
        },
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <Adminnavbar />
        <Navbar />

        <div className="ml-64 ">
          {/* Flexbox container7s*/}
          <Flexbox className="flex justify-evenly p-5 gap-2 bg-justify-between ">
            {/* New Deliveries Card */}
            <Flexbox className="p-4 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              New Deliveries
              <br />
              <br />
              50
              <BsCartPlus className="w-20 h-20 ml-12 opacity-70 " />
            </Flexbox>
            {/* Pending Deliveries Card */}
            <Flexbox className=" p-4 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Pending Deliveries
              <br />
              <br />
              20
              <PiClockCountdown className="w-20 h-20 ml-12" />
            </Flexbox>
            {/* Delivered Card */}
            <Flexbox className="p-4 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Delivered
              <br />
              <br />
              5
              <BsCartCheck className="w-20 h-20 ml-12" />
            </Flexbox>
            {/* Available Drivers Card */}
            <Flexbox className="p-4 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Available Drivers
              <br />
              <br />
              {availableCount}/{availableCount + unavailableCount}
              <TfiUser className="w-20 h-20 ml-12" />
            </Flexbox>
          </Flexbox>

          {/* Pie chart=*/}
          <div className="flex justify-center items-center p-5">
            <div className=" p-4 overflow-x-auto shadow-2xl sm:rounded-lg bg-white border-2 border-whatsapp-green">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Curiorservisedashboard;
