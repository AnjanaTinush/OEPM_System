import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiGreenhouse } from "react-icons/gi";
import { AiFillProfile } from "react-icons/ai";
import Navbar from '../../Component/Navbar';
import logo from '../../../Images/logo.png';

function Adminnavbar() {
  const location = useLocation();

  return (
    <div className="bg-wight-green text-white sticky top-0 left-0 flex flex-col justify-between shadow-xl min-w-[240px] h-screen" style={{ width: '240px' }}>
      <div className="p-4 mt-2">
        <Navbar/>
        <Link
          to="/tunneldashboard"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/tunneldashboard"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dash Board</span>
        </Link>
        <Link
          to="/t_tunnels"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/t_tunnels"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <GiGreenhouse className="mr-5 text-lg" />
          <span className="font-bold text-lg">Tunnels</span>
        </Link>
        <Link
          to="/t_tunnelprofile"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/t_tunnelprofile"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <AiFillProfile className="mr-5 text-lg" />
          <span className="font-bold text-lg">Profiles</span>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-20 mr-5">
        <img src={logo} alt="Logo" style={{ width: '120px' }} />
      </div>
      <p className="text-gray-400 ml-10 mt-0">&copy; 2024 PolyCrop</p>
    </div>
  );
}

export default Adminnavbar;
