import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiExitDoor } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaArrowCircleLeft } from "react-icons/fa";
import Navbar from "../../Component/Navbar";

import logo from "../../../Images/logo.png";

function AdprofileNavbar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("currentuser"));

  return (
    <div
      className="bg-wight-green text-white sticky top-0 left-0 flex flex-col justify-between shadow-xl min-w-[240px] h-screen"
      style={{ width: "240px" }}
    >
      <div className="p-4">
        <div className="mr-12">
          <div className="flex justify-center items-center mt-4">
            <Navbar />
          </div>
        </div>

        <Link
          to="/e_profile_dashboard"
          className={`flex items-center w-full mt-6 py-3 px-4 ${
            location.pathname === "/e_profile_dashboard"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <LuLayoutDashboard className="mr-5 text-lg" />
          <span className="font-bold text-lg">Profile Board</span>
        </Link>
        <Link
          to={`/e_userprofile/${user._id}`}
          className={`flex items-center w-full mt-6 py-3 px-4 ${
            location.pathname === `/e_userprofile/${user._id}`
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <CgProfile className="mr-5 text-lg" />
          <span className="font-bold text-lg">Edit profie</span>
        </Link>
        <Link
          to="/e_requestedleave"
          className={`flex items-center w-full mt-6 py-3 px-4 ${
            location.pathname === "/e_requestedleave"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiExitDoor className="mr-5 text-lg" />
          <span className="font-bold text-lg">My leaves</span>
        </Link>
      </div>
      <div className="p-4">
        <div className="flex justify-center items-center  mr-5">
          <img src={logo} alt="Logo" />
        </div>
        <p className="text-gray-400 ml-7 py-4">&copy; 2024 PolyCrop </p>
      </div>
    </div>
  );
}

export default AdprofileNavbar;
