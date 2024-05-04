import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from '../../Component/Navbar';
import { Tabs } from 'antd';
import { FaPencilAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const { TabPane } = Tabs;

AOS.init({
  duration: 2000,
});

function Userprofile() {

  const { uuid } = useParams("");
  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const user = JSON.parse(localStorage.getItem("currentuser"));

  const [showPasswords, setShowPasswords] = useState(false);

 
   //get user details
   useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = (
          await axios.post(`http://localhost:5000/api/users/getuser/${uuid}`)
        ).data;
        setLoading(false);
        console.log(response.user);
        setid(response.user._id);
        setname(response.user.name);
        setemail(response.user.email);
        setphone(response.user.phone);
        setimageurl(response.user.imageurl);
        setPassword(response.user.password);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getUser();
  }, []);

  const deleteuseraccount = async (id) => {
    try {
      setLoading(true);
      const confirmed = await Swal.fire({
        title: "Are you sure you want to delete your account?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
      });
  
      if (confirmed.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
        setLoading(false); // Set loading to false after successful deletion
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your account has been deleted successfully.",
        }).then(() => {
          localStorage.removeItem("currentuser"); // Remove user from localStorage
          navigate("/login"); // Navigate to login page after successful deletion
        });
      } else {
        setLoading(false); // Set loading to false if deletion is canceled
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of an error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting your account.",
      });
    }
  };
  


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const fetchData = async () => {
    if (!user) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <div>
        <Navbar/>
        <div className="mt-3 ml-3 mr-3 bs">
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          

          
          
    
    <div class="flex flex-col justify-between p-4 leading-normal">
    <div data-aos="zoom in" className="ml-10 mb-6">
                  <div class="  relative    xl:max-w-3xl  md:mx-auto    mt-8 bg-wight-green shadow-2xl rounded-lg text-gray-900">
                    <div>
                      <h1 className="text-dark text-2xl p-2 font-bold ml-80">
                        Edit Profile
                      </h1>
                      <div class="flex items-center justify-center p-12">
                        <div class="mx-auto w-full max-w-[550px] bg-wight-green">
                          <form >
                            <img
                              class="object-cover ml-52 rounded-full object-center h-32 "
                              src={imageurl}
                              alt="Woman looking front"
                            />

                            <div class="mb-5">
                              <label
                                htmlFor="name"
                                className="mb-3 ml-60 block text-base font-medium text-[#07074D]"
                              >
                                Tap here
                              </label>
                              <label
                                htmlFor="file-upload"
                                className="px-4 py-2  rounded-md cursor-pointer flex items-center"
                              >
                                <FaPencilAlt className="h-5 ml-60 w-6 mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
                              </label>
                              <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                      <li className="flex flex-col items-center justify-around">
                        <Link to={`/u_update/${user._id}`}>
                          <button className="btn1 mr-3">
                            <FaEdit className="mr-5 text-3xl transition-transform duration-300 ease-in-out transform hover:scale-110" />
                          </button>
                        </Link>
                      </li>

                      <li class="flex flex-col items-center justify-around">
                        <button
                          className="btn1 mr-3"
                          onClick={() => deleteuseraccount(user._id)}
                        >
                          <MdDeleteForever className="mr-5 text-3xl transition-transform duration-300 ease-in-out transform hover:scale-110 text-red-500" />
                        </button>
                      </li>
                    </ul>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  setimageurl(e.target.value);
                                }}
                                readOnly
                              />
                            </div>

                            <div class="mb-5">
                              <label
                                for="name"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                              >
                                Change Name
                              </label>
                              <input
                                type="text"
                                value={name}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => {
                                  setname(e.target.value);
                                }}
                                readOnly
                              />
                            </div>
                            <div class="mb-5">
                              <label
                                for="email"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                              >
                                Change Email Address
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => {
                                  setemail(e.target.value);
                                }}
                                readOnly
                              />
                            </div>
                            <div class="mb-5">
                              <label
                                for="phone"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                              >
                                Change Phone Number
                              </label>
                              <input
                                type="text"
                                name="phone"
                                maxLength={10}
                                id="phone"
                                value={phone}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => {
                                  setphone(e.target.value);
                                }}
                                readOnly
                              />
                            </div>

                            <div class="-mx-3 flex flex-wrap">
                              <div class="w-full px-3 sm:w-1/2">
                                <div class="mb-5">
                                  <label
                                    for="date"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                  >
                                    Change Password
                                  </label>
                                  <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute  ml-80  left-0 mt-5  px-6 focus:outline-none"
                                  >
                                    {/*Show password*/}
                                    {showPasswords ? (
                                      <FaEyeSlash className="text-gray-400" />
                                    ) : (
                                      <FaEye className="text-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-110" />
                                    )}
                                  </button>
                                  <input
                                    type={showPasswords ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 pr-12 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    readOnly
                                  />
                                </div>
                              </div>

                            
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

    </div>



        </TabPane>
        <TabPane tab="Orders" key="2">
          
        </TabPane>
        <TabPane tab="" key="3">
       
        </TabPane>
       
      </Tabs>
    </div>
    </div>
  )
}

export default Userprofile