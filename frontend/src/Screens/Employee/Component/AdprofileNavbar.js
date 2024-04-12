import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiExitDoor } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaArrowCircleLeft } from "react-icons/fa";


import logo from '../../../Images/logo.png';

function AdprofileNavbar() {

    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('currentuser'));

  return (
  
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col  justify-between shadow-xl">
   
    <div className="p-4">
  
     
      <div className="p-4">
      <div className="flex justify-center items-center mt-4 mr-5">
        <img src={logo} alt="Logo" />
      </div>
      
    </div>

      <Link
        to="/e_profile_dashboard"
        className={`flex items-center w-full mt-6 py-3 px-4 ${location.pathname === "/e_profile_dashboard" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
      >
        <LuLayoutDashboard className="mr-5 text-lg" />
        <span className="font-bold text-lg">Profile Board</span>
      </Link>
      <Link
        to={`/e_userprofile/${user._id}`}
        className={`flex items-center w-full mt-6 py-3 px-4 ${location.pathname === `/e_userprofile/${user._id}` ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
      >
        <CgProfile  className="mr-5 text-lg" />
        <span className="font-bold text-lg">Edit profie</span>
      </Link>
      <Link
        to="/e_requestedleave"
        className={`flex items-center w-full mt-6 py-3 px-4 ${location.pathname === "/e_requestedleave" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
      >
        <GiExitDoor  className="mr-5 text-lg" />
        <span className="font-bold text-lg">my leaves</span>
      </Link>

    
    </div>
    <Link
        to="/employeeDashboard"

        className={`flex items-center w-full mt-28  px-4  text-green-900  font-custom rounded-md text-decoration-none `}
     >
        <FaArrowCircleLeft className="mr-5 text-lg" />
        <span className="">Back to Dashboard</span>
      </Link>
    <p className="text-gray-400 ml-10 py-4">&copy; 2024 PolyCrop </p>
  </div> 
  )
}

export default AdprofileNavbar