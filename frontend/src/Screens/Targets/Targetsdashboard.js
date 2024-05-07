import React, { useState, useEffect } from 'react';
import Adminnavbar from './Component/Adminnavbar';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Targetsdashboard() {
  const [targetsData, setTargetsData] = useState([]);
  const [typeCounts, setTypeCounts] = useState({});
  const [totalTargets, setTotalTargets] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);

  //  fetch targets data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/target/getalltargets');
      setTargetsData(response.data);
      calculateTypeCounts(response.data);
      calculateTotalTargets(response.data);
      renderBarGraph(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //  calculate type counts
  const calculateTypeCounts = (data) => {
    const counts = {};
    data.forEach((item) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    setTypeCounts(counts);
  };

  //  calculate total targets
  const calculateTotalTargets = (data) => {
    setTotalTargets(data.length);
  };

  //  render the bar graph
  const renderBarGraph = (data) => {
    const typeCounts = {};
    data.forEach((item) => {
      typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
    });

    const labels = Object.keys(typeCounts);
    const counts = Object.values(typeCounts);

    const ctx = document.getElementById('barGraph').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Target types',
          data: counts,
          backgroundColor: 'rgba(144, 238, 144, 0.5)',
          borderColor: 'rgba(144, 238, 144, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count',
            },
          },
        },
      },
    });
  };

  //  target cards
  const renderTargetCards = () => {
    return Object.entries(typeCounts).map(([type, count]) => (
      <div key={type} className="p-4 border border-gray-200 rounded-md shadow-md m-4">
        <h2 className="text-lg font-semibold">{type}</h2>
        <p className="text-gray-600">Count: {count}</p>
      </div>
    ));
  };

  // Render the component
  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />

        <div className="flex flex-col ml-16 mr-8 mt-8 mb-8" style={{ zIndex: 900 }}>
          <canvas id="barGraph" width="400" height="170"></canvas>
          <div className="flex flex-wrap justify-center mt-8 bg-white rounded-3xl shadow-xl p-6">
            {renderTargetCards()}
          </div>
          {/* Total targets*/}
          <div className="flex flex-wrap justify-center mt-8 bg-white rounded-xl shadow-xl p-3">
            <h2 className="text-lg font-semibold">Total Targets </h2>
            <p className="text-gray-600 mt-1"> : {totalTargets}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Targetsdashboard;
