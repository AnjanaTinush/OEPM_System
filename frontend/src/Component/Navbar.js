import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../Images/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem("currentuser"));

  function Logout() {
    localStorage.removeItem("currentuser");
    window.location.href = "/login";
  }

  return (
    <div className="">
      <header className="bg-white   bg-opacity-10 border-b border-gray-300 shadow-md">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <a href="/">
            <img src={logo} className="flex h-12 w-26 mr-12 " alt="Logo" />
          </a>

          <div className="flex items-center">
            {user ? (
              <>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
                  <h1 className="text-sm text-whatsapp-green mr-4">
                    {user.name}
                  </h1>
                  <div className="relative inline-block ml-4 mt-0">
                    {/* Dropdown Button */}
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
                      <div className="absolute right-0 mt-0 flex w-40 flex-col bg-wight-green gap-2 rounded-xl p-2 text-green-900 shadow-xl">
                        <a href="/u_userprofile">
                          {" "}
                          <div class="flex flex-col">
                            <button
                              href="/u_userprofile"
                              class="flex justify-center gap-3 rounded-md py-2 px-3 hover:text-white hover:bg-whatsapp-green no-underline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="h-5 w-5"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span>Profile</span>
                            </button>
                          </div>
                        </a>
                        <button
                          class="flex justify-center gap-1 rounded-md bg-red-600 py-1 px-3 font-semibold hover:bg-red-500 focus:ring-2 focus:ring-red-400 hover:text-white"
                          onClick={Logout}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>

                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link to={`/login`}>
                  <button className="text-white text-base font-semibold border border-solid border-transparent p-3 ">
                    Login
                  </button>
                </Link>
                <Link to={`/register`}>
                  <button
className="text-white text-base font-semibold border border-solid border-transparent p-3"                    onClick={() => console.log("Navigate to sign-up page")}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
