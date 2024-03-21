import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiExitDoor } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";




function AdprofileNavbar() {

    const location = useLocation();

  return (
  
<div className="text-white bg-white border border-gray-200 h-auto min-h-120 w-1/6 fixed top-24 left-4 flex flex-col rounded-lg justify-between shadow-xl">
    <div className="p-4">
      <br></br>
      <br></br>
      <Link
        to="/e_profile_dashboard"
        className={`flex items-center w-full py-3 px-4 ${location.pathname === "/e_profile_dashboard" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
      >
        <LuLayoutDashboard className="mr-5 text-lg" />
        <span className="font-bold text-lg">Dash Board</span>
      </Link>
      <Link
        to="/e_userprofile"
        className={`flex items-center w-full py-3 px-4 ${location.pathname === "/e_userprofile" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
      >
        <CgProfile  className="mr-5 text-lg" />
        <span className="font-bold text-lg">Edit profie</span>
      </Link>
      <Link
        to="/e_requestedleave"
        className={`flex items-center w-full py-3 px-4 ${location.pathname === "/e_requestedleave" ? 'bg-whatsapp-green text-white' : 'hover:bg-whatsapp-green text-green-900'} font-custom rounded-md text-decoration-none mb-2`}
      >
        <GiExitDoor  className="mr-5 text-lg" />
        <span className="font-bold text-lg">my leaves</span>
      </Link>
    </div>
    <div className="p-4 mt-40">
     
      <p className="text-gray-400 ml-6 mt-5">&copy; 2024 PolyCrop </p>
    </div>
  </div> 
  )
}

export default AdprofileNavbar