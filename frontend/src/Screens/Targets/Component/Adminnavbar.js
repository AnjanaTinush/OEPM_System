import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiExitDoor } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import Navbar from '../../../Component/Navbar'

import logo from '../../../Images/logo.png';

function Adminnavbar() {
  const location = useLocation();

  return (
    
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col justify-between shadow-xl">
      <div className="p-4">
        <br></br>
        <Navbar/>
        <Link
          to="/targetsdashboard"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/targetsdashboard" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dash Board</span>
        </Link>
        <Link
          to="/t_targets"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/t_targets" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <TbTargetArrow className="mr-5 text-lg" />
          <span className="font-bold text-lg">Targets</span>
        </Link>
        
        <Link
          to="/m_targets"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/m_targets" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <FaUsers  className="mr-5 text-lg" />
          <span className="font-bold text-lg">Manage Targets</span>
        </Link>
        
      </div>
      <div className="p-4">
        <div className="flex justify-center items-center mt-4 mr-5">
          <img src={logo} alt="Logo" />
        </div>
        <p className="text-gray-400 ml-6">&copy; 2024 PolyCrop </p>
      </div>
    </div>
  );
}

export default Adminnavbar;
