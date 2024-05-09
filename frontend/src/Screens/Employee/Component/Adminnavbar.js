import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiExitDoor } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import Navbar from "../../Component/Navbar";

import logo from "../../../Images/logo.png";

function Adminnavbar() {
  const location = useLocation();

  return (
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col justify-between shadow-xl">

    <div className="p-1 mt-2">
    <Navbar/>
        <Link            to="/employeeDashboard"
            className={`flex items-center w-full mt-6 py-3 px-4 ${location.pathname === "/employeeDashboard" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}

     
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dash Board</span>
        </Link>
        <Link

            to="/e_allusers"
            className={`flex items-center w-full mt-3 py-3 px-4 ${location.pathname === "/e_allusers" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}

        >
          <FaUsers className="mr-5 text-lg" />
          <span className="font-bold text-lg">Users</span>
        </Link>
        <Link

            to="/e_approveleave"
            className={`flex items-center w-full mt-3 py-3 px-4 ${location.pathname === "/e_approveleave" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}

        >
          <GiExitDoor className="mr-5 text-lg" />
          <span className="font-bold text-lg">leaves</span>
        </Link>
        <Link

to="/e_atendance"
className={`flex items-center w-full mt-3 py-3 px-4 ${location.pathname === "/e_atendance" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}

>
<FaUserClock className="mr-5 text-lg" />
<span className="font-bold text-lg">Attendance</span>
</Link>
      </div>
      <div className="flex justify-center items-center mt-10 mr-5">
        <img src={logo} alt="Logo" />
      </div>
      <p className="text-gray-400 ml-10 mt-0">&copy; 2024 PolyCrop</p>
    </div>
  );
}

export default Adminnavbar;