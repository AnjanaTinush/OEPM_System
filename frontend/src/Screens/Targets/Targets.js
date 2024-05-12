import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from "./Component/Adminnavbar";
import Loader from "../../Component/Loader";
import CountdownTimer from "./Component/CountdownTimer";
import { useReactToPrint } from "react-to-print";
import { Tag } from "antd";

function Targets() {
  const componentPDF = useRef(); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [targets, setTargets] = useState([]); 
  const [idCounter, setIdCounter] = useState(0); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch targets data from the server
  const fetchData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/target/getalltargets");
      setTargets(data.data);
      setLoading(false);
      const maxId = data.data.reduce((max, target) => (target.id > max ? target.id : max), 0);
      setIdCounter(maxId + 1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // delete targets
  async function deletetarget(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/target/delete/${id}`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  // const handleApprove = async (id) => {
  //   try {
  //      await axios.put(`http://localhost:5000/api/target/approve/${id}`);
  //      fetchData();
  //   } catch (error) {
  //      console.log(error);
  //   }
  //  };
   
  //  const handleReject = async (id) => {
  //   try {
  //      await axios.put(`http://localhost:5000/api/target/reject/${id}`);
  //      fetchData();
  //   } catch (error) {
  //      console.log(error);
  //   }
  //  };
   
  
  

  //search targets
  const filteredTargets = targets.filter((target) =>
    target.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //report generation
  const generateReport = useReactToPrint ({
    content: () => componentPDF.current,
    documentTitle:"target_list",
    onAfterPrint: ()=> alert("Report generated!")
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
    <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />

        <div className="flex flex-col w-full">
        <h1 className="text-center text-3xl font-bold text-green-600 mt-8  mr-32">
            Target Details
          </h1>
          <div className="absolute top-32 right-0  mr-8">
            <button
             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              onClick={generateReport}
            >
              Generate Report
            </button>
          </div>

         
          <div className="flex justify-center items-center h-full mt-16 mb-16 mr-12">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ">
              <div className="mb-2  px-8">
                <input
                  type="text"
                  className="form-input w-full border border-gray-300 rounded-lg px-5 py-2 shadow-2xl sm:rounded-full "
                  placeholder="Search targets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            
              <div ref={componentPDF} style={{ width: '100%' }}>
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
                        Status
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
                        <td className="px-6 py-4 text-green-900">
                              {/* Display status tag */}
                              {target.status === "Pending" ? (
                                <Tag color="blue">Pending</Tag>
                              ) : target.status === "Approved" ? (
                                <Tag color="green">Approve</Tag>
                              ) : (
                                <Tag color="red">Rejected</Tag>
                              )}
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
        </div>
      </div>
    </div>
      </>
      )}
    </div>
    
  );
}

export default Targets;
