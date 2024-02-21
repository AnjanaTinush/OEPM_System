import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiGreenhouse } from "react-icons/gi";
import { IoMdContacts } from 'react-icons/io';
import logo from '../../../Images/logo.png';

function Adminnavbar() {
  const location = useLocation();

  return (
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col justify-between shadow-xl">
      <div className="p-4">
        <br></br>
        <br></br>
        <Link
          to="/employeeDashboard"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/employeeDashboard" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dash Board</span>
        </Link>
        <Link
          to="/e_allusers"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/e_allusers" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiGreenhouse className="mr-5 text-lg" />
          <span className="font-bold text-lg">Tunnels</span>
        </Link>
        <Link
          to="/"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <IoMdContacts className="mr-5 text-lg" />
          <span className="font-bold text-lg">Contact</span>
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
