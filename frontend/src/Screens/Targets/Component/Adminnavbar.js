import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdBorderColor } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import Navbar from '../../Component/Navbar';
import logo from '../../../Images/logo.png';

function Adminnavbar() {
  const location = useLocation();

  return (
    <div className="bg-wight-green text-white sticky top-0 left-0 flex flex-col justify-between shadow-xl min-w-[240px] h-screen" style={{ width: '240px' }}>
      <div className="p-4 mt-2">
        <Navbar/>
        <Link
          to="/targetsdashboard"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/targetsdashboard"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dash Board</span>
        </Link>
        <Link
          to="/t_targets"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/t_targets"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <TbTargetArrow className="mr-5 text-lg" />
          <span className="font-bold text-lg">Targets</span>
        </Link>
        <Link
          to="/m_targets"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/m_targets"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <FaUsers className="mr-5 text-lg" />
          <span className="font-bold text-lg">Manage Targets</span>
        </Link>
        <Link
          to="/t_orderDetails"
          className={`flex items-center py-3 px-5 ${
            location.pathname === "/t_orderDetails"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
          style={{ width: '100%', minWidth: '180px' }} // Fixed width for buttons
        >
          <MdBorderColor className="mr-5 text-lg" />
          <span className="font-bold text-lg">Manage Targets</span>
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
