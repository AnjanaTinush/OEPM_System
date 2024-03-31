import React, { useEffect, useState } from 'react';
import axios from "axios";
import Adminnavbar from './Component/Adminnavbar'
import Navbar from '../Component/Navbar'
import Loader from '../../Component/Loader'
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init({
  duration:2500
});


function Approveleave() {
    const [approveleaves, setapproveleaves] = useState([]);
    const [loading, setloading] = useState(false);

    // Read data
    const fetchData = async () => {
        try {
            const data = await axios.get("http://localhost:5000/api/leaves/getallleaves");
            setapproveleaves(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function disapprove(requestid) {
        try {
            setloading(true);
            const result = await axios.post("/api/leaves/cancelrequest", { requestid });
            console.log(result.data);
            setloading(false);
            Swal.fire(
                "Congratulations",
                "Your Leave Request  Rejected  Successfully",
                "success"
            ).then((result) => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            setloading(false);
            Swal.fire("OOps", "Something went wrong", "error");
        }
    }

    async function approve(requestid) {
      try {
          setloading(true);
          const result = await axios.post("/api/leaves/approverequest", { requestid });
          console.log(result.data);
          setloading(false);
          Swal.fire(
              "Congratulations",
              "Your Leave Request  Approved  Successfully",
              "success"
          ).then((result) => {
              window.location.reload();
          });
      } catch (error) {
          console.log(error);
          setloading(false);
          Swal.fire("OOps", "Something went wrong", "error");
      }
  }

    return (
        <div>
            <Adminnavbar />
            <Navbar />
            <div className="flex justify-center items-center ml-48 mr-10 h-full mt-10">
                <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16">
                    <table data-aos="zoom out" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {approveleaves.length > 0 &&
                                approveleaves.map((leave) => (
                                    <tr key={leave._id} className="bg-white dark:bg-table-row  hover:tablerow-hover dark:hover:bg-tablerow-hover">
                                        <td className="px-6 py-4 font-medium text-green-900">
                                            {leave.userid}
                                        </td>
                                        <td className="px-6 py-4 text-green-900">
                                            {leave.fromdate}
                                        </td>
                                        <td className="px-6 py-4 text-green-900">
                                            {leave.todate}
                                        </td>
                                        <td className="px-6 py-4 text-green-900">
                                            {leave.desription}
                                        </td>
                                        <td className="px-6 py-4 text-green-900">
                                            {leave.status}
                                        </td>
                                        <td className="px-6 py-4 text-green-900">
                                            <button className='ml-2 bg-white hover:bg-gray-100 text-gray-800 font-light py-0 px-2 border  rounded-3xl h-9 shadow' onClick={() => approve(leave._id)}>
                                              Approve</button>
                                            
                                          
                   <button className='ml-2 bg-white hover:bg-gray-100 text-gray-800 font-light py-0 px-2 border  rounded-3xl h-9 shadow' onClick={() => disapprove(leave._id)}>
                   Disapprove</button>
                  

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Approveleave;
