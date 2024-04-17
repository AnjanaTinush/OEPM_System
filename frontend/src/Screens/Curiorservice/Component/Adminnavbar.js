import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import logo from "../../../Images/logo.png";
import { GiSteeringWheel } from "react-icons/gi";
import Navbar from "../../Component/Navbar";
import { TbTruckDelivery } from "react-icons/tb";

function Adminnavbar() {
  const location = useLocation();

  return (
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col justify-between shadow-xl">
      <div className="p-4">
       
        <Navbar />
        <br></br>
        <br></br>
        <Link
          to="/Curiorservisedashboard"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/Curiorservisedashboard"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dash Board</span>
        </Link>

        <Link
          to="/j_deliveries"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/j_deliveries"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <TbTruckDelivery className="mr-5 text-lg" />
          <span className="font-bold text-lg">Deliveries</span>
        </Link>

        <Link
          to="/j_drivers"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/j_drivers"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiSteeringWheel className="mr-5 text-lg" />
          <span className="font-bold text-lg">Drivers</span>
        </Link>

        <Link
          to="/j_driverprofile"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/j_driverprofile"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiSteeringWheel className="mr-5 text-lg" />
          <span className="font-bold text-lg">Driver Profile</span>
        </Link>


      </div>
      <div className="p-4 ml">
        <div className="flex justify-center items-center mt-4 mr-5">
          <img src={logo} alt="Logo" />
        </div>
        <p className="text-gray-400 ml-6">&copy; 2024 PolyCrop </p>
      </div>
    </div>
  );
}

export default Adminnavbar;
