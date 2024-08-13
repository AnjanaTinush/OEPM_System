import React from "react";
import Adminnavbar from "../Component/Adminnavbar";
import { getTotal } from "../helpers/helper";
import { default as api } from "../store/apiSlice";
import ExpenceForm from "../Component/form/expenceForm";
import Expence_Graph from "../Component/graph/ExpenceGraph";

function Expence() {
  const { data } = api.useGetExpenceLabelsQuery();

  return (
    <div className="flex flex-col md:flex-row relative">
      
    
      <div className="absolute inset-y-0 left-0 z-10">
      
        <Adminnavbar />
      </div>
     
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center drop-shadow-lg text-gray-800">
          <h1 className="text-4xl py-8 mb-10 bg-red-600 text-white rounded-lg w-96 h-16 flex justify-center items-center mx-auto mt-2">
            Expence
          </h1>

          
          <div className="grid md:grid-cols-2 gap-4">
           
            <div className="flex justify-center">
              <div className="w-full ml-96">
                <ExpenceForm />
              </div>
            </div>

          
            <div className="flex flex-col items-center md:items-end mr-24">
              <div className="relative">
                <Expence_Graph />
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

export default Expence;
