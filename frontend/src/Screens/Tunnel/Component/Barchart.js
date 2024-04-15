import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Barchart() {
  const [presentCapacities, setPresentCapacities] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchPresentCapacities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tunnel/getpresentcapacities"
        );
        setPresentCapacities(response.data);
      } catch (error) {
        console.log("Error fetching present capacities:", error);
      }
    };

    fetchPresentCapacities();
  }, []);

  useEffect(() => {
    if (presentCapacities && Object.keys(presentCapacities).length > 0) {
      const labels = Object.keys(presentCapacities);
      const data = Object.values(presentCapacities);

      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = document.getElementById("presentCapacitiesChart");

      if (ctx) {
        const newChartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Total Current Capacity",
                data: data,
                backgroundColor: "rgba(112, 224, 0, 1)",
                borderColor: "rgba(112, 224, 0, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "y",
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          },
        });

        setChartInstance(newChartInstance);
      }
    }
  }, [presentCapacities]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-green-900 mb-4">
        Total Current Capacities of Plant Types
      </h2>
      <canvas id="presentCapacitiesChart" width="650" height="400"></canvas>
    </div>
  );
}

export default Barchart;
