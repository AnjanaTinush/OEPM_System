import React, { useState, useEffect } from "react";
import AdprofileNavbar from './Component/AdprofileNavbar';
import Navbar from '../Component/Navbar';
import moment from "moment";
import { DatePicker } from 'antd';
import axios from "axios";
import Loader from '../../Component/Loader';

const { RangePicker } = DatePicker;

function Requestedleave() {
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [desription, setDescription] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const filterByDate = (dates) => {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
  };

  const leaverequest = async () => {
    const requestdetails = {
      userid: JSON.parse(localStorage.getItem("currentuser"))._id,
      fromdate,
      todate,
      desription
    };

    try {
      const result = await axios.post("/api/leaves/leaverequest", requestdetails);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
        setLoading(true);
        const currentUser = JSON.parse(localStorage.getItem("currentuser"));
        const data = await axios.post("/api/leaves/getleaverequestedbyuserid", { userid: currentUser._id });
        setLeaves(data.data);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
    }
};


  return (
    <div>
      <Navbar />
      <AdprofileNavbar />
      <div className="max-w-2xl bg-gray-200 border rounded-3xl px-2 mx-auto mt-16 mr-60">
        <form className="flex items-center w-full">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} className="rounded-3xl" />
          <input
            type="text"
            className="w-1/3 border-none py-2 px-3 mb-3 mt-3 mr-4 ml-4 h-8 rounded-3xl"
            placeholder="Enter your reason"
            value={desription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-light py-0 px-2 border rounded-3xl h-9 shadow" onClick={leaverequest}>
            Send Request
          </button>
        </form>
      </div>

      <div className="flex justify-center items-center ml-40 h-full mt-10">
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  From Date
                </th>
                <th scope="col" className="px-6 py-3">
                  To Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && <Loader />}
              {error && <tr><td colSpan="5">Error fetching data.</td></tr>}
              {leaves.map((leave) => (
                <tr key={leave.id} className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover">
                  <td className="px-6 py-4 font-medium text-green-900">{leave.userid}</td>
                  <td className="px-6 py-4 text-green-900">{leave.fromdate}</td>
                  <td className="px-6 py-4 text-green-900">{leave.todate}</td>
                  <td className="px-6 py-4 text-green-900">{leave.desription}</td>
                  <td className="px-6 py-4 text-green-900">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Requestedleave;
