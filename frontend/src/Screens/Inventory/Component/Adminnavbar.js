import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiGreenhouse } from "react-icons/gi";
import { IoMdContacts } from 'react-icons/io';
import logo from '../../../Images/logo.png';
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdAssignmentAdd } from "react-icons/md";
import { MdQrCodeScanner } from "react-icons/md";


function Adminnavbar() {
  const location = useLocation();
  

  return (
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col justify-between shadow-xl">
      <div className="p-4">
        <div className="flex justify-center items-center mt-4 mr-5">
          <img src={logo} alt="Logo" />
        </div>
        <br />
        <br />
        <br />
        <Link
          to="/inventorydasgboard"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/inventorydasgboard" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dashboard</span>
        </Link>
        <br />
        <br />
        <Link
          to="/i_manage"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/i_manage" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <MdAssignmentAdd className="mr-5 text-lg" />
          <span className="font-bold text-lg">Manage</span>
        </Link>
        <br />
        <br />
        <Link
          to="/i_history"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/i_history" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <FaClockRotateLeft className="mr-5 text-lg" />
          <span className="font-bold text-lg">History</span>
        </Link>
        <br />
        <br />
        <Link
          to="/i_faq"
          className={`flex items-center w-full py-3 px-4 ${location.pathname === "/i_faq" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
        >
          <MdQrCodeScanner className="mr-5 text-lg" />
          <span className="font-bold text-lg">Packaging</span>
        </Link>
      </div>
      <div className="p-4">
        <p className="text-gray-400 flex justify-center items-center">&copy; 2024 PolyCrop </p>
      </div>
    </div>
  );
}




export default Adminnavbar;
