import React, { useState } from "react";
import logo from '../../../Images/logo.png';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";



function Adminnavbar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
     
<div className="flex h-screen bg-wight-green ">
      {/* Sidebar */}
    
      <div className="bg-wight-green text-dark-green w-1/5 p-4 shadow-lg">

        <img src={logo} />
        <br></br>
        <br></br>
        <br></br>
        <ul>
          <li className="mb-3 w-full">
          <a href="" className="flex items-center w-full text-green-900 hover:text-white py-2 hover:bg-whatsapp-green rounded-md text-decoration-none">
              <LuLayoutDashboard className="inline-block ml-2 mr-2" />
              <span className="ml-2">Home</span>
            </a>

          </li>
          <li className="mb-3 w-full">
          <a href="" className="flex items-center w-full text-green-900 hover:text-white py-2 hover:bg-whatsapp-green rounded-md text-decoration-none">
              <FaUsers className="inline-block ml-2 mr-2" />
              <span className="ml-2">Users</span>
            </a>

          </li>
          <li className="mb-3 w-full">
          <a href="" className="flex items-center w-full text-green-900 hover:text-white py-2 hover:bg-whatsapp-green rounded-md">
              <GiExitDoor   className="inline-block ml-2 mr-2" />
              <span className="ml-2">Leaves</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="md:container md:mx-auto">
      
      <div className=" mx-auto w-100 p-6 flex justify-end">
        <div className="mr-56">
        <article class="mx-auto my-2 max-w-sm rounded-xl bg-gradient-to-r from-whatsapp-green via-whatsapp-green to-wight-green">
        <div class="p-2 rounded-lg">
    <h4 class="text-2xl font-bold">Take your Web Dev skills to the next level!</h4>
    <a class="hover:underline text-gray-600" href="https://coding-space.vercel.app" target="_blank" title="codingspace">Visit CodingSpace↗</a>
  </div>
</article>
      </div>
        <h1 className="text-1xl mr-3 mt-3  text-whatsapp-green font-medium font-popins">Roy Json</h1>
      {/* Dropdown */}
      <div className="relative inline-block">
        {/* Dropdown Button */}
        <button
          className="flex h-12 w-12 items-center justify-center rounded-lg  transition  overflow-hidden"
          onClick={toggleDropdown}
        >
          <img
            className="w-full h-full object-cover rounded-full border-2 border-whatsapp-green "
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
            alt="Profile"
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-3 flex w-60 flex-col gap-3 rounded-xl p-4 text-green-900 shadow-lg">
            
            <div class="flex flex-col">
                <button href="#" class="flex justify-center gap-3 rounded-md py-2 px-3  hover:text-white hover:bg-whatsapp-green no-underline">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Profile</span>
                </button>
              
            </div>
             <button class="flex justify-center gap-1 rounded-md bg-red-600 py-1 px-3 font-semibold hover:bg-red-500 focus:ring-2 focus:ring-red-400 hover:text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
                </svg>

                <span>Logout</span> 
            </button>
          </div>
        )}
      </div>

    </div>
      </div>
    </div>

   
   
   
  )
}

export default Adminnavbar