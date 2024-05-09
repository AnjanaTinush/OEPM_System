import React from "react";
import Adminnavbar from "../Component/Adminnavbar";
import Expence_Graph from "../Component/graph/ExpenceGraph";
import Income_Graph from "../Component/graph/Income_graph";

function FinancialDashbord() {
  return (
    <div>
      <Adminnavbar />
      <div>
        <h1 className="text-4xl  font-bold font-sans w-96 text-green-800 h-16 flex justify-center items-center mx-auto mt-2 ">
          Financial Management
        </h1>
        <div className="flex justify-center py-12 ml-12 gap-12">
          <div
            className="bg-blue-100 p-4 flex flex-col items-center gap-4 rounded-lg border hover:shadow-lg drop-shadow-lg  mr-4"
            style={{ width: 400, height: 600 }}
          >
            <h1 className="text-3xl  font-bold font-sans w-96  h-16 flex justify-center items-center mx-auto mt-2 ">
              Income
            </h1>
            <Income_Graph />
          </div>
          <div
            className="bg-blue-100 p-4 flex flex-col items-center gap-4 rounded-lg border hover:shadow-lg drop-shadow-lg border-slate-300"
            style={{ width: 400, height: 600 }}
          >
            <h1 className="text-3xl  font-bold font-sans w-96  text-red-600  h-16 flex justify-center items-center mx-auto mt-2 ">
              Expence
            </h1>
            <Expence_Graph />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FinancialDashbord;
