import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js library

import Adminnavbar from './Component/Adminnavbar';

function Employeedashboard() {
  var l = 2;

  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    labels: ['user', 'Employee','Tunnel', 'Mashine', 'Finansial', 'Targrts', 'Curiorservice', 'Inventary'],
    datasets: [
      {
        data: [10,10, 20, 15, l, 5, 10, 15], // Modify these values to your desired percentages
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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
    <Adminnavbar />
    <div className="w-96 ml-60 h-2xl bg-white shadow-lg rounded-lg p-2  mt-2 mb-1">
      <h2 className="text-lg font-semibold text-center italic">Summary of user count</h2>
      {users.length > 0 && <Pie data={data} />}

      <div class="flex justify-between py-1">
    <div class="flex mb-1 text-base font-medium justify-between">
        <div class="bg-blue-600 h-2.5 w-2 mt-2"></div>
        <span class="text-green-900 ">Users :</span> 20
    </div>
    <div class="flex items-center">
        <div class="text-base font-medium mr-12 flex items-center">
            <div class="bg-blue-600 h-2.5 w-2 mt-1 "></div>
            <span class="text-green-900 ml-7">Tunnel :</span> 30
        </div>
    </div>
</div>
<div class="flex justify-between py-1">
    <div class="flex mb-1 text-base font-medium ">
        <div class="bg-blue-600 h-2.5 w-2 mt-2"></div>
        <span class="text-green-900 ml-2">Employee :</span> 20
    </div>
    <div class="flex justify-between ">
        <div class="text-base font-medium mr-12 flex items-center">
            <div class="bg-blue-600 h-2.5 w-2 mt-1 mr-2"></div>
            <span class="text-green-900">Funancial :</span> 30
        </div>
    </div>
</div>

<div class="flex justify-between py-1">
    <div class="flex mb-1 text-base font-medium">
        <div class="bg-blue-600 h-2.5 w-2 mt-2"></div>
        <span class="text-green-900 ml-2">curiour :</span> 20
    </div>
    <div class="flex items-center">
    <div class="text-base font-medium mr-12 flex items-center">
        <div class="bg-blue-600 h-2.5 w-2 mt-1 mr-2"></div>
        <span class="text-green-900 ml-6">Target :</span> 30
    </div>
</div>

</div>
<div class="flex justify-between py-1">
    <div class="flex mb-1 text-base font-medium">
        <div class="bg-blue-600 h-2.5 w-2 mt-2"></div>
        <span class="text-green-900 ml-2">Inventory :</span> 20
    </div>
    <div class="flex items-center">
    <div class="text-base font-medium mr-12 flex items-center">
        <div class="bg-blue-600 h-2.5 w-2 mt-1 mr-2"></div>
        <span class="text-green-900 ml-2">Mashine :</span> 30
    </div>
</div>

</div>
    
</div>
 </div>
  

  );
}

export default Employeedashboard;
