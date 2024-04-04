import React from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";
import Flexbox from "flexbox-react";
import { AiFillPieChart } from "react-icons/ai";

function Curiorservisedashboard() {
  return (
    <div>
      <Adminnavbar />
      <Navbar />

      <div className="ml-64 p-10">
        <Flexbox className="flex justify-evenly p-5 gap-2 bg-justify-between ">
          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl ">
            Total Deliveries
            <br></br>
            <br></br>
            200
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>
          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl">
            Active Drivers
            <br></br>
            <br></br>
            8/20
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>

          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl">
            Pending Deliveries
            <br></br>
            <br></br>
            8
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>

          <Flexbox className=" p-4 bg-whatsapp-green rounded-lg shadow-2xl">
            Ratings
            <br></br>
            <br></br>
            <AiFillPieChart className="w-20 h-20 ml-12" />
          </Flexbox>
        </Flexbox>
      </div>
    </div>
  );
}

export default Curiorservisedashboard;
