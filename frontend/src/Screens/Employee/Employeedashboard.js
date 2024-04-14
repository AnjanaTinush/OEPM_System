import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js library
import Adminnavbar from "./Component/Adminnavbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Loader from "../../Component/Loader";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tag } from "antd";

AOS.init({
  duration: 2500,
});



function Employeedashboard() {
  const [users, setUsers] = useState([]);
  const [roleCounts, setRoleCounts] = useState({});
  const [data, setData] = useState(null);
  const [approveleaves, setapproveleaves] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/api/leaves/statuscounts")
      .then((response) => {
        setStatusCounts(response.data);
        setLoading(false)
      })

      .catch((error) => {
        console.error("Error fetching status counts:", error);
        setLoading(false)
      });
  }, []);

  //get all leaves
  const allleaves = async () => {
    try {
      setLoading(true)
      const data = await axios.get(
        "http://localhost:5000/api/leaves/getallleaves"
      );
      setapproveleaves(data.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    allleaves();
  }, []);

  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        "http://localhost:5000/api/users/getallusers"
      );
      setUsers(response.data);
setLoading(false)
      // Calculate role counts
      const counts = response.data.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});
      setRoleCounts(counts);
    } catch (error) {
      console.log(error);
      setLoading(false)
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
              "#14532d", //employee
              "#365314", //curior
              "#65a30d", //user
              "#a3e635", //target
              "#fcd34d", //financial
              "#48c81b", //inventory
              "#22c55e", //machine
              "#15803d", //tunel
            ],
          },
        ],
      });
    }
  }, [roleCounts]);

  return (
    <div>
      {loading ? (
                <Loader />
            ) : (<>
            <div className="flex">
      <Adminnavbar />
      <div className="ml-80 mt-6  ">
        <h1 className="flex justify-center font-semibold text-center italic text-2xl">
          Employee Leaves Summary
        </h1>
        {/* Radial Progress Chart for Pending Percentage 
          
          <div>
                Pending: {statusCounts.pending?.percentage}% ({statusCounts.pending?.count})
            </div>
            <div>
                Approved: {statusCounts.approved?.percentage}% ({statusCounts.approved?.count})
            </div>
            <div>
                Disapproved: {statusCounts.disapproved?.percentage}% ({statusCounts.disapproved?.count})
            </div>
          
          */}{" "}
        <h1  data-aos="zoom in" className="flex justify-center text-black-green text-1xl mt-4">
          Pending({statusCounts.pending?.count})
        </h1>
        <div class="flex justify-center max-w-sm p-6 ml-6 transition-transform duration-300 ease-in-out transform hover:scale-110">
          <div  data-aos="zoom out" style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={statusCounts.pending?.percentage}
              text={`${statusCounts.pending?.percentage}%`}
              styles={buildStyles({
                pathColor: "#48c81b",
                textColor: "#48c81b",
                trailColor: "#d6d6d6",
              })}
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>
        <div className="flex gap-8 mt-4">
          <div class="max-w-sm p-6 ">
            <h1  data-aos="zoom in" className="flex justify-center text-black-green text-1xl mb-4 ">
              Approved({statusCounts.approved?.count})
            </h1>
            <div  data-aos="zoom out" style={{ width: 150, height: 150 }}>
              <CircularProgressbar
                value={statusCounts.approved?.percentage}
                text={`${statusCounts.approved?.percentage}%`}
                styles={buildStyles({
                  pathColor: "#48c81b",
                  textColor: "#48c81b",
                  trailColor: "#d6d6d6",
                })}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
          </div>

          <div  class="max-w-sm p-6">
            <h1  data-aos="zoom in" className="flex justify-center text-black-green text-1xl mb-4">
              Disapproved({statusCounts.disapproved?.count})
            </h1>
            <div  data-aos="zoom out" style={{ width: 150, height: 150 }}>
              <CircularProgressbar
                value={statusCounts.disapproved?.percentage}
                text={`${statusCounts.disapproved?.percentage}%`}
                styles={buildStyles({
                  pathColor: "#48c81b",
                  textColor: "#48c81b",
                  trailColor: "#d6d6d6",
                })}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      <div  data-aos="zoom out" className="w-96 ml-40 h-2xl bg-wight-green shadow-lg rounded-lg p-2 mt-6 mb-1  ">
        <h2 className="text-2xl font-semibold text-center italic">
          Summary of user count
        </h2>
        {data && <Pie data={data} />}

        {/* Render role counts in two columns */}
        {Object.keys(roleCounts).length > 0 && (
          <div className="flex">
            <div>
              <ul>
                <li>
                  <div className="bg-green-900 h-2.5 w-2 mt-4 p-1.5"></div>
                </li>
                <li>
                  <div className="bg-lime-900 h-2.5 w-2 mt-7 p-1.5"></div>
                </li>
                <li>
                  <div className="bg-lime-600 h-2.5 w-2 mt-7 p-1.5"></div>
                </li>
                <li>
                  <div className="bg-lime-400 h-2.5 w-2 mt-7 p-1.5"></div>
                </li>
              </ul>
            </div>
            <div className="flex w-1/2">
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
                  <li>
                    <div className="bg-amber-300 h-2.5 w-2 mt-4 p-1.5"></div>
                  </li>
                  <li>
                    <div className="bg-whatsapp-green h-2.5 w-2 mt-7 p-1.5"></div>
                  </li>
                  <li>
                    <div className="bg-green-500 h-2.5 w-2 mt-7 p-1.5"></div>
                  </li>
                  <li>
                    <div className="bg-green-800 h-2.5 w-2 mt-7 p-1.5"></div>
                  </li>
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

            </>)}
    </div>
  );
}

export default Employeedashboard;
