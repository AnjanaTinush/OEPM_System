import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem('currentuser'));

  function Logout() {
    localStorage.removeItem('currentuser');
    window.location.href = '/login';
  }

  return (
    
    
    <div>
      <div className="w-6 mt-4  top-0 ml-20 right-0  flex-col justify-between ">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-lg transition overflow-hidden"
          onClick={toggleDropdown}
        >
          <img
            className="w-full h-full object-cover rounded-full border-2 border-whatsapp-green"
            src={user.imageurl}
            alt="Profile"
          />
        </button>
         
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-10 flex flex-col bg-wight-green gap-2 rounded-xl p-2 text-green-900 shadow-xl">
            <div className="flex flex-col">
              <Link
                to="/e_profile_dashboard"
                className="flex justify-center gap-3 rounded-md py-2 px-3 hover:text-white hover:bg-whatsapp-green no-underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Profile</span>
              </Link>
            </div>
            <button
              className="flex justify-center gap-1 rounded-md bg-red-600 py-1 px-3 font-semibold hover:bg-red-500 focus:ring-2 focus:ring-red-400 hover:text-white"
              onClick={Logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Logout</span>
            </button>
            
          </div>
          
        )}
        
      </div>
     
      <h1 className=" text-whatsapp-green ml-14 mt-4 ">{user.name}</h1>
   
   
      </div>  
    
  );
}

export default Navbar;
