import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "../Tunnel/Component/Adminnavbar";
import Loader from "../../Component/Loader";
import Swal from "sweetalert2";
import { Tag } from "antd";

function AdminTargetApproval() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/target/getalltargets');
      setTargets(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      // Call the backend API to update the target status to approved
      await axios.post('/api/target/approverequest', { requestId: id });
      // Refetch data to update the UI
      fetchData();
      setLoading(false);
      Swal.fire( "Target approved successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Error", "Failed to approve target", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      // Call the backend API to update the target status to rejected
      await axios.post('/api/target/cancelrequest', { requestId: id });
      // Refetch data to update the UI
      fetchData();
      setLoading(false);
      Swal.fire( "Target rejected successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Error", "Failed to reject target", "error");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        
        <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />

        <div className=" flex-col w-full ">
          <div className=" top-4 right-0  mr-4">

          <h1 className="text-center text-3xl font-bold text-green-600 mt-8 mb-12 mr-32">
            Tunnel manager Target Approval</h1>

          <div className="flex justify-center items-center h-full mt-16 mb-16">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-0">
              
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
            <tr>
              <th scope="col" className="px-6 py-3">Target ID</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Actions / Status</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((target, index) => (
              <tr key={target._id}
                className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover">

                <td className="px-6 py-4 font-medium text-green-900 ">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-green-900 ">{target.type}</td>
                <td className="px-6 py-4 font-medium text-green-900 ">{target.quantity}</td>
                <td className="px-6 py-4 font-medium text-green-900 ">{new Date(target.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium text-green-900 ">
                {target.status == "Pending" ? (
                  <>
                  <button
                    onClick={() => handleApprove(target._id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(target._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                  </>
                ) : (
                            //after get approvele display status
                            <div className="w-700dp">
                              {target.status === "Pending" ? (
                                <Tag color="blue">Pending</Tag>
                              ) : target.status === "Approved" ? (
                                <Tag color="green">Approve</Tag>
                              ) : (
                                <Tag color="red">Rejected</Tag>
                              )}
                            </div>
                          )}
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
      )}
    </div>
  );
}

export default AdminTargetApproval;
