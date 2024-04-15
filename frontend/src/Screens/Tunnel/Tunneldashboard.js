import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Component/Adminnavbar';
import Chart from 'chart.js/auto';
import Barchart from './Component/Barchart';

function Tunneldashboard() {
  const [totalTunnels, setTotalTunnels] = useState(0);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [plantTypeCounts, setPlantTypeCounts] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchTotalTunnels();
    fetchWeather();
    fetchHumidity();
    fetchPlantTypeCounts();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  const fetchTotalTunnels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tunnel/getalltunnels');
      setTotalTunnels(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async () => {
    try {
      // Get the device's geolocation coordinates
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f93daed4030fe87615a3577085f85db2&units=metric`);
          setWeather(response.data);
          setLocation(response.data.name);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHumidity = async () => {
    try {
      // Get the device's geolocation coordinates
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f93daed4030fe87615a3577085f85db2&units=metric`);
          setHumidity(response.data.main.humidity);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlantTypeCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tunnel/getplanttypecounts');
      setPlantTypeCounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (plantTypeCounts && Object.keys(plantTypeCounts).length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous chart instance
      }
      const ctx = document.getElementById('plantTypeChart').getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(plantTypeCounts),
          datasets: [{
            label: 'Tunnels Count',
            data: Object.values(plantTypeCounts),
            backgroundColor: [
              'rgba(0, 75, 35, 1)',
              'rgba(0, 128, 0, 1)',
              'rgba(112, 224, 0, 1)',
              'rgba(158, 240, 26, 1)',
              'rgba(204, 255, 51, 1)',
              'rgba(170, 204, 0, 1)',
              'rgba(212, 215, 0, 1)',
              'rgba(255, 255, 63, 1)',
              'rgba(171, 255, 79, 1)',
              'rgba(74, 214, 109, 1)',
              'rgba(146, 230, 167, 1)',
              'rgba(179, 233, 199, 1)',
              'rgba(240, 255, 241, 1)',
            ],
            borderColor: [
              'rgba(0, 75, 35, 1)',
              'rgba(0, 128, 0, 1)',
              'rgba(112, 224, 0, 1)',
              'rgba(158, 240, 26, 1)',
              'rgba(204, 255, 51, 1)',
              'rgba(170, 204, 0, 1)',
              'rgba(212, 215, 0, 1)',
              'rgba(255, 255, 63, 1)',
              'rgba(171, 255, 79, 1)',
              'rgba(74, 214, 109, 1)',
              'rgba(146, 230, 167, 1)',
              'rgba(179, 233, 199, 1)',
              'rgba(240, 255, 241, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options:{
          cutout: '70%',
          animation: {
            animateRotate: true,
            animateScale: true,
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              fontColor: '#333',
              fontSize: 12,
              padding: 10,
            },
          },
          responsive: true,
          
        }
      });
      setChartInstance(newChartInstance);
    }
  }, [plantTypeCounts]);

  

  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
          <h1 className="text-3xl font-bold ml-7 mt-6 text-center text-green-900 font-custom">Welcome to Tunnel Dashboard</h1>
          <div className="flex justify-between items-center p-10" style={{ paddingTop: '4rem', paddingBottom: '0.5rem' }}>
            <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-110" >
              <h2 className="text-lg font-semibold text-green-900 mb-4">Total Tunnels</h2>
              <div className="text-2xl font-bold text-whatsapp-green">{totalTunnels}</div>
            </div>
            {weather && (
              <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-110" style={{ width: '300px' }}>
                <h2 className="text-lg font-semibold text-green-900 mb-4">Weather in {location}</h2>
                <div className="flex items-center">
                  <img
                    className="h-10 w-10"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                  <div className="text-2xl font-bold ml-2 text-whatsapp-green">{weather.main.temp}°C</div>
                </div>
              </div>
            )}
            {humidity !== null && (
              <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-110" style={{ width: '200px' }}>
                <h2 className="text-lg font-semibold text-green-900 mb-4">Humidity Level</h2>
                <div className="text-2xl font-bold text-whatsapp-green">{humidity}%</div>
              </div>
            )}
            <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-110" >
              <h2 className="text-lg font-semibold text-green-900 mb-4 ">Date</h2>
              <div className="text-2xl font-bold text-whatsapp-green">{currentTime.toDateString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-110" >
              <h2 className="text-lg font-semibold text-green-900 mb-4 ">Time</h2>
              <div className="text-2xl font-bold text-whatsapp-green">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
          <div className="flex justify-between items-center p-10" style={{ paddingTop: '2rem', paddingBottom: '0.5rem' }}>
          <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-xl font-semibold text-green-900 mb-4">Plant Types</h2>
            <canvas id="plantTypeChart" width="400" height="400"></canvas> {/* Pie chart canvas */}
            </div>
          <div className="bg-white rounded-xl shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-105" >
            <Barchart />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Tunneldashboard;
