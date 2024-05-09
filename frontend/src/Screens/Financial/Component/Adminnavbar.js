import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiGreenhouse } from "react-icons/gi";
import { IoMdContacts } from "react-icons/io";
import logo from "../../../Images/logo.png";

function Adminnavbar() {
  const location = useLocation();

  return (
    <div className="bg-wight-green text-white h-screen w-1/6 fixed top-0 left-0 flex flex-col justify-between shadow-xl">
      <div className="p-4">
        <br></br>
        <br></br>
        <Link
          to="/financialDashbord"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/financialDashbord"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiGreenhouse className="mr-5 text-lg" />
          <span className="font-bold text-lg">Dashbord</span>
        </Link>
        <Link
          to="/income"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/income"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiGreenhouse className="mr-5 text-lg" />
          <span className="font-bold text-lg">Income</span>
        </Link>

        <Link
          to="/expence"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/expence"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <IoMdContacts className="mr-5 text-lg" />
          <span className="font-bold text-lg">Expences</span>
        </Link>
        <Link
          to="/empsallary"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/empsallary"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <IoMdContacts className="mr-5 text-lg" />
          <span className="font-bold text-lg">Sallary </span>
        </Link>
        <Link
          to="/message"
          className={`flex items-center w-full py-3 px-4 ${
            location.pathname === "/message"
              ? "bg-whatsapp-green text-white"
              : "hover:bg-whatsapp-green text-green-900"
          } font-custom rounded-md text-decoration-none mb-2`}
        >
          <GiGreenhouse className="mr-5 text-lg" />
          <span className="font-bold text-lg">Message</span>
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
