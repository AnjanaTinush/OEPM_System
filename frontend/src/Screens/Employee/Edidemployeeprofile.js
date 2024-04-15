import React, { useState, useEffect } from "react";
import axios from "axios";
import AdprofileNavbar from "./Component/AdprofileNavbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import Loader from "../../Component/Loader";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 2000,
});

const Edidemployeeprofile = () => {
  const { uid } = useParams("");

  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility_1 = () => {
    setShowPasswords((prevShowPasswords) => !prevShowPasswords);
  };

  const togglePasswordVisibility_2 = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //take data for update
  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = (
          await axios.post(`http://localhost:5000/api/users/getuser/${uid}`)
        ).data;
        setLoading(false);
        console.log(response.user);
        setid(response.user._id);
        setname(response.user.name);
        setemail(response.user.email);
        setphone(response.user.phone);
        setPassword(response.user.password);
        setimageurl(response.user.imageurl);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getUser();
  }, []);

  //updateuser function
  async function Updateuser(e) {
    e.preventDefault();

    const updateuser = {
      name,
      email,
      phone,
      imageurl,
      password,
    };

    try {
      setLoading(true);
      const response = (
        await axios.put(
          `http://localhost:5000/api/users/updateuser/${uid}`,
          updateuser
        )
      ).data;
      console.log(response);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Profile updated successfully",
        "success"
      ).then(() => {
        window.location.href = `/e_userprofile/${uid}`;
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-wight-green">
            <div className="flex">
              <AdprofileNavbar />
              <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
                <div data-aos="zoom in" className="ml-10 mb-6">
                  <div class="  relative    xl:max-w-3xl  md:mx-auto    mt-8 bg-wight-green shadow-2xl rounded-lg text-gray-900">
                    <div>
                      <h1 className="text-dark text-2xl p-2 font-bold ml-80">
                        Edit Profile
                      </h1>
                      <div class="flex items-center justify-center p-12">
                        <div class="mx-auto w-full max-w-[550px] bg-wight-green">
                          <form onSubmit={Updateuser}>
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
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
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
                                id="phone"
                                value={phone}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                onChange={(e) => {
                                  setphone(e.target.value);
                                }}
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
                                    onClick={togglePasswordVisibility_1}
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
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:ring-Buttongreen mt-2 ml-48 p-3 px-10 font-medium rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Edidemployeeprofile;
