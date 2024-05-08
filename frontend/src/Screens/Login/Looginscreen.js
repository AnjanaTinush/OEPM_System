import React, { useState, useEffect } from "react";
import { Link, json } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../Component/Navbar";
import toast from "react-hot-toast";
import Loader from "../../Component/Loader";
import bgimg1 from "./Componenet/bgimg1.png";
import logo from "./Componenet/logo.png";

AOS.init({
  duration: "1000",
});


function Looginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const Login = async () => {
    const userCredentials = {
      email,
      password,
    };

    try {
      setloading(true);
      const result = await axios.post(
        "http://localhost:5000/api/users/login",
        userCredentials
      );
      setloading(false);

      localStorage.setItem("currentuser", JSON.stringify(result.data.user));
      localStorage.setItem("user:detail", JSON.stringify(result.data.user));

      // Check the success property in the response
      if (result.data.success) {
        // Update the user state and redirect
        const role = result.data.user.role;

        if (role === "User") {
          window.location.href = "/c_displayitem";
        } else if (role === "Employee manager") {
          window.location.href = "/employeeDashboard";
        } else if (role === "Tunnel manager") {
          window.location.href = "/tunneldashboard";
        } else if (role === "Courior servise") {
          window.location.href = "/curiorservisedashboard";
        } else if (role === "Target manager") {
          window.location.href = "/targetsdashboard";
        } else if (role === "Inventory manager") {
          window.location.href = "/inventorydasgboard";
        } else if (role === "Financial manager") {
          window.location.href = "/financialdashboard";
        } else if (role === "Machine manager") {
          window.location.href = "/machinedashboard";
        } else {
          // Handle other roles or scenarios as needed
          console.error("Unsupported role:", role);
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(" Invalid credintial");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            data-aos="zoom in"
            className="flex flex-col justify-center items-center bg-zinc-800 min-h-screen"
            style={{
              backgroundImage:`url(${bgimg1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {/* Sign In Button */}
            <a href="/register" className="absolute top-0 right-5 m-6">
              <button className="text-white text-base font-semibold border border-solid border-transparent">
                Sign Up
              </button>
            </a>
            {/* End of Sign In Button */}
            <div className="overflow-hidden   w-full max-w-screen-lg mx-auto">
              <div className="flex flex-col items-center gap-10 md:flex-row md:gap-0">
                <div className="w-full md:w-2/3 mr-32">
                  <div className="flex flex-col items-center text-white leading-[130%] md:max-w-full">
                    <br />
                    <img
                      loading="lazy"
                      src={logo}
                      className="w-full md:w-[400px] "
                      alt="Farm fresh vegetables"
                    />
                    <br />
                    <div
                      className="mt-2 md:mt-0 text-lg font-extralight max-w-full text-center"
                      style={{ letterSpacing: "5px" }}
                    >
                      Farm fresh bounty awaits
                    </div>
                    <div
                      className="mt-2 md:mt-7 text-5xl md:text-4xl font-semibold max-w-full text-center"
                      style={{ letterSpacing: "6px", lineHeight: "1.0" }}
                    >
                      Sign up &amp; shop now!
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/5 md:ml-6">
                  <form className="flex flex-col gap-8  py-5  bg-white rounded-2xl max-w-[30rem] mx-auto md:px-5 md:mt-12">
                    <div className="text-4xl font-bold text-neutral-900 tracking-[4.9px] mb-8 text-center">
                      Login
                    </div>
                    <input
                      className="px-5 py-3 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                    <input
                      className="px-5 py-3 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />

                   <div className="text-base text-stone-950 mt-5 text-center">
               <span className="text-zinc-400">Fogot password? </span> <a href='/forgot-password'> Click
                Here
                </a>
              </div>

                    

                    <button
                      type="submit"
                      onClick={Login}
                      className="px-4 py-3 mt-7 text-md text-white bg-lime-600 border border-solid border-neutral-200 rounded-[36.683px] tracking-[2.52px] max-md:px-5 transition duration-500 ease-in-out transform hover:bg-lime-700 hover:scale-100"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Looginscreen;