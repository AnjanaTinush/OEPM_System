import React, { useState, useEffect,useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import Adminnavbar from './Component/Adminnavbar';
import Navbar from '../Component/Navbar';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Itemupdate() {
 

  const [items, setItems] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory/getallitems");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      renderChart();
    }
  }, [items]);

  const renderChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart instance
    }

    const names = items.map(item => item.name);
    const quantities = items.map(item => item.quantity);

    const ctx = document.getElementById('myChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: 'Quantity',
          data: quantities,
          backgroundColor: 'rgba(0, 200, 50, 0.2)',
          borderColor: 'rgba(0, 100, 0, 0.3)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="bg-wight-green h-screen flex flex-col"> 
      <Navbar style={{ marginBottom: '20px' }}/>
      <Adminnavbar/>
      <div className="flex justify-center items-center h-full"> {/* Center content vertically and horizontally */}
        {/* Render the bar chart */}
        <div className="max-w-4xl bg-white shadow-xl rounded-3xl p-6 text-center"> {/* Adjust width of chart container and center text */}
          <h2 className="text-xl font-semibold text-dark font-custom">
            Item Quantities(Kg)
          </h2>
          <div className="mt-5">
            <canvas id="myChart" width="1200" height="800"></canvas> {/* Adjust chart width */}
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  
  
}

export default Itemupdate;