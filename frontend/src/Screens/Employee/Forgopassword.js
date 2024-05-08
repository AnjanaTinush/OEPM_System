import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Removed unused import 'json'
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from '../../Component/Loader';
import logo from '../Login/Componenet/logo.png' // Corrected spelling of Component
import bgimg1 from '../Login/Componenet/bgimg1.png'; // Corrected spelling of Component bgimg1.png
import Swal from "sweetalert2";

AOS.init({
  duration: 1000,
});

function Forgopassword() { // Corrected function name to start with uppercase
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/resetpassword/forgot-password', { email });
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.status,
      });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User with this email does not exist',
        });
      } else {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send reset password link',
        });
      }
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
              backgroundImage: `url(${bgimg1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {/* Sign In Button */}
            <Link to="/register" className="absolute top-0 right-5 m-6">
              {/* Changed anchor tag to Link */}
              <button className="text-white text-base font-semibold border border-solid border-transparent">
                Sign Up
              </button>
            </Link>
            {/* End of Sign In Button */}
            <div className="overflow-hidden w-full max-w-screen-lg mx-auto">
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
                      style={{ letterSpacing: '5px' }}
                    >
                      Farm fresh bounty awaits
                    </div>
                    <div
                      className="mt-2 md:mt-7 text-5xl md:text-4xl font-semibold max-w-full text-center"
                      style={{ letterSpacing: '6px', lineHeight: '1.0' }}
                    >
                      Sign up &amp; shop now!
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/5 md:ml-6">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 py-5 bg-white rounded-2xl max-w-[30rem] mx-auto md:px-5 md:mt-12"
                  >
                    <div className="text-4xl font-bold text-neutral-900 tracking-[4.9px] mb-8 text-center">
                      Forgot Password
                    </div>
                    <input
                      className="px-5 py-3 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => { setEmail(e.target.value) }}
                      required
                    />

                    <button
                      type="submit"
                      className="px-4 py-3 mt-7 text-md text-white bg-lime-600 border border-solid border-neutral-200 rounded-[36.683px] tracking-[2.52px] max-md:px-5 transition duration-500 ease-in-out transform hover:bg-lime-700 hover:scale-100"
                    >
                      Send mail
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

export default Forgopassword;
