import React, { useState } from "react";
import axios from "axios";
import "./Css/Signupscreen.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../Component/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import signup from "./Componenet/signup.jpg";
import logo from "./Componenet/logo.png";
import { ImagetoBase64 } from "../../imagetobase64";
import loginSignupImage from "../../Images/login-animation.gif";

AOS.init({
  duration: "1000",
});

function Signupscreen() {
  const [fullName, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [imageurl, setimageurl] = useState(loginSignupImage);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadProfileImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);
    setimageurl(imageData);
  };

  const registeruser = async (event) => {
    event.preventDefault();

    if (password === cpassword) {
      if (phone.length < 10) {
        toast.error("Phone number must be at least 10 digits.");
        return;
      }

      const user = {
        fullName,
        email,
        phone,
        password,
        cpassword,
        imageurl,
      };

      try {
        setLoading(true);
        const result = await axios.post(
          "http://localhost:5000/api/users/register",
          user
        );
        setLoading(false);
        if (result.data.success) {
          toast.success(result.data.message);
          navigate("/login");
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Password doesn't match...");
    }
  };

  return (
    <div>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <div
            data-aos="zoom in"
            className="flex flex-col justify-center items-center bg-zinc-800 min-h-screen"
            style={{
              backgroundImage: `url(${signup})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <a href="/blank-page" className="absolute top-0 right-5 m-6">
              <button className="text-white text-base font-semibold border border-solid border-transparent">
                Login
              </button>
            </a>
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
                  <form
                    onSubmit={registeruser}
                    className="flex flex-col gap-3  py-5  bg-white rounded-2xl max-w-[30rem] mx-auto md:px-5 md:mt-12"
                  >
                    <div className="text-4xl font-bold text-neutral-900 tracking-[4.9px] mb-8 text-center">
                      SIGN UP
                    </div>
                    <div className="relative mb-4">
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadProfileImage}
                      />
                      <label
                        htmlFor="profileImage"
                        className="absolute  bottom-0 right-0 w-[70px] mr-[105px] text-center transition-all duration-300 ease-in-out cursor-pointer  rounded-b-lg  hover:text-white font-serif"
                      >
                        Upload
                      </label>
                      <div className="mx-auto overflow-hidden rounded-full shadow-md w-28 h-28">
                        <img
                          src={imageurl}
                          className="object-cover w-full h-full"
                          alt=""
                        />
                      </div>
                    </div>
                    <input
                      className="px-5 py-2 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="text"
                      placeholder="Username"
                      value={fullName}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      required
                    />
                    <input
                      className="px-5 py-2 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      required
                    />
                    <input
                      className="px-5 py-2 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="tel"
                      placeholder="Phone Number "
                      value={phone}
                      onChange={(e) => {
                        const inputPhone = e.target.value;
                        if (/^\d{0,10}$/.test(inputPhone)) {
                          setphone(inputPhone);
                        }
                      }}
                      required
                    />

                    <input
                      className="px-5 py-2 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      required
                    />
                    <input
                      className="px-5 py-2 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="password"
                      placeholder="Confirm Password"
                      value={cpassword}
                      onChange={(e) => {
                        setcpassword(e.target.value);
                      }}
                      required
                    />
                    <div className="text-xs text-black leading-4">
                      By clicking Sign Up, you agree to our Terms, Privacy
                      Policy, and Cookies Policy. You may receive SMS
                      notifications from us and can opt out at any time.
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-3 mt-7 text-md text-white bg-lime-600 border border-solid border-neutral-200 rounded-[36.683px] tracking-[2.52px] max-md:px-5 transition duration-500 ease-in-out transform hover:bg-lime-700 hover:scale-100"
                    >
                      SIGN UP
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

export default Signupscreen;
