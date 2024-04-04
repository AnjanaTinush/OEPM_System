import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";
import CountdownTimer from "./Component/CountdownTimer";

import { useReactToPrint } from "react-to-print";

function Targets() {
  const componentPDF = useRef();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [targets, setTargets] = useState([]);
  const [idCounter, setIdCounter] = useState(0); // Counter for generating target IDs

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/target/getalltargets");
      setTargets(data.data);
      // Set the idCounter to one more than the maximum existing target ID
      const maxId = data.data.reduce((max, target) => (target.id > max ? target.id : max), 0);
      setIdCounter(maxId + 1);
    } catch (error) {
      console.log(error);
    }
  };

  async function deletetarget(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/target/delete/${id}`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  // Filter targets based on search query
  const filteredTargets = targets.filter((target) =>
    target.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle report generation
  const generateReport = useReactToPrint ({
        content: () => componentPDF.current,
        documentTitle:"target_list",
        onAfterPrint: ()=> alert("Report generated!")


    
  }
  );

  return (
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full">
          <Navbar />
          <br></br>
          <br></br>

          <div className="absolute top-32 right-0 mt-12 mr-12">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={generateReport}
          >
            Generate Report
          </button>
        </div>



          <div className="flex justify-center items-center h-full">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
              
              <div className="mb-2 shadow-2xl ">
                <input
                  type="text"
                  className="form-input w-full border border-gray-300 rounded-lg px-5 py-2 shadow-2xl sm:rounded-full"
                  placeholder="Search targets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              

              <div ref={componentPDF} style={{width:'100%'}}>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Target Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Item Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTargets.map((target, index) => (
                    <tr
                      key={target.id}
                      className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                      
                    >
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {target.type}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-900 ">
                        {target.quantity}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-900">
                        <CountdownTimer targetDate={target.date} />
                      </td>

                      <td className="px-6 py-4 text-right text-green-900">
                        <Link to={`/t_targetupdate/${target._id}`}>
                          <button className="btn2 mr-3">
                            <FaEdit className="mr-5 text-xl" />
                          </button>
                        </Link>
                        <Link to="#">
                          <button
                            className="btn1"
                            onClick={(e) => deletetarget(target._id)}
                          >
                            <MdDeleteForever className="mr-5 text-2xl " />
                          </button>
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Targets;
