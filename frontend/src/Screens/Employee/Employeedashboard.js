import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js library
import Chart from "react-apexcharts";

import Adminnavbar from './Component/Adminnavbar';

function Employeedashboard() {
  
  const [users, setUsers] = useState([]);
  const [roleCounts, setRoleCounts] = useState({});
  const [data, setData] = useState(null);
  const [approveleaves, setapproveleaves] = useState([]);


  //get all leaves
  const allleaves = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/leaves/getallleaves"
      );
      setapproveleaves(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allleaves();
  }, []);

  const[state,setState]=useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  })

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/getallusers");
      setUsers(response.data);

      // Calculate role counts
      const counts = response.data.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});
      setRoleCounts(counts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (roleCounts && Object.keys(roleCounts).length > 0) {
      setData({
        labels: Object.keys(roleCounts),
        datasets: [
          {
            data: Object.values(roleCounts),
            backgroundColor: [
              '#FF6384',
              '#02200',
              '#36A2EB',
              '#FFCE56',
              '#2ECC71',
              '#9B59B6',
              '#FFA726',
              '#5AABAC',
            ],
          },
        ],
      });
    }
  }, [roleCounts]);


  return (
    <div className="flex">
    <Adminnavbar />
       {/*Line graph*/}
    <div className="ml-72 mt-40 ">
    <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="500"
            />

    </div>
    
    <div className="w-96 ml-40 h-2xl bg-white shadow-lg rounded-lg p-2 mt-8  mb-1">
      <h2 className="text-lg font-semibold text-center italic">Summary of user count</h2>
      {data && <Pie data={data} />}
      
      {/* Render role counts in two columns */}
      {Object.keys(roleCounts).length > 0 && (
        <div className="flex">
          <div>
    <ul>  
          
          <li><div class="bg-pink-500 h-2.5 w-2 mt-4  p-1.5"></div></li>
          <li><div class="bg-black h-2.5 w-2 mt-7  p-1.5"></div></li>
          <li><div class="bg-blue-600 h-2.5 w-2 mt-7  p-1.5"></div></li>
          <li><div class="bg-yellow-400 h-2.5 w-2 mt-7  p-1.5"></div></li>
        </ul>
        </div>
          <div className=" flex w-1/2">
            <ul>
              {Object.entries(roleCounts)
                .slice(0, Math.ceil(Object.keys(roleCounts).length / 2))
                .map(([role, count]) => (
                  <li key={role} className="p-2">
                    <span className="text-green-900">{role}:</span> {count}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex w-1/2">
          <div>
    <ul>  
          
          <li><div class="bg-green-500 h-2.5 w-2 mt-4  p-1.5"></div></li>
          <li><div class="bg-purple-600 h-2.5 w-2 mt-7  p-1.5"></div></li>
          <li><div class="bg-orange-500 h-2.5 w-2 mt-7  p-1.5"></div></li>
          <li><div class="bg-blue-400 h-2.5 w-2 mt-7  p-1.5"></div></li>
        </ul>
        </div>
            <ul>
              {Object.entries(roleCounts)
                .slice(Math.ceil(Object.keys(roleCounts).length / 2))
                .map(([role, count]) => (
                  <li key={role} className="p-2">
                    <span className="text-green-900">{role}:</span> {count}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>


  </div>
  

  );
}

export default Employeedashboard;
