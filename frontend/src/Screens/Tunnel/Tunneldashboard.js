import React from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";

function Tunneldashboard() {
  return (
    <div className="bg-wight-green">
      <Adminnavbar />
      <Navbar />
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-3xl mt-32 p-6">
      <h2 className="text-xl font-semibold text-dark font-custom  ">
                    Enter the Tunnel Details
                  </h2>
        <form  className="mt-8">
          <div>
            <input
              type="number"
              placeholder="Enter Temperature"
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            />
          </div>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter Humidity"
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
            />
          </div>
          <div className="mt-8 mb-2">
            <button
              type="submit"
              className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
              
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tunneldashboard;
