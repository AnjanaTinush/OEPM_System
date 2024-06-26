import React from "react";
import Form from "../Component/form/Income_form";
import Graph from "../Component/graph/Income_graph";
import Adminnavbar from "../Component/Adminnavbar";
import { getTotal } from "../helpers/helper";
import { default as api } from "../store/apiSlice";

function Income() {
  const { data } = api.useGetLabelsQuery();

  return (
    <div className="flex flex-col md:flex-row relative"> {/* Add relative positioning to the parent container */}
      {/* Admin navbar on the left */}
      <div className="absolute inset-y-0 left-0 z-10"> {/* Ensure Adminnavbar is on top with z-index */}
        <Adminnavbar />
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center drop-shadow-lg text-gray-800">
          <h1 className="text-4xl py-8 mb-10 bg-emerald-400 text-white rounded-lg w-96 h-16 flex justify-center items-center mx-auto mt-2">
            Income
          </h1>

          {/* Grid columns */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Form centered with custom width */}
            <div className="flex justify-center">
              <div className="w-full ml-96">
                <Form />
              </div>
            </div>

            {/* Graph and Total amount on the right */}
            <div className="flex flex-col items-center md:items-end mr-24">
              <div className="relative">
                <Graph />
                <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-4 font-bold title text-center -mt-24">
                  Total
                  <span className="block text-3xl text-emerald-400">
                    ${getTotal(data) ?? 0}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
