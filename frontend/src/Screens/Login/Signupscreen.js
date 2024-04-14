import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './Css/Signupscreen.css';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Navbar from '../../Component/Navbar';
import Loader from '../../Component/Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import signup from "./Componenet/signup.jpg";
import logo from "./Componenet/logo.png";

AOS.init({
  duration:'5000'
});


function Signupscreen() {

    const[name , setname]=useState('')
    const[email , setemail]=useState('')
    const[phone , setphone]=useState('')
    const[password , setpassword]=useState('')
    const [cpassword, setcpassword] = useState('');
    

    const [Loading,setLoading] = useState(false)
    const navigate=useNavigate();

    
    async function registeruser(event) {
      event.preventDefault();

    if (password === cpassword) {
      const user = {
        name,
        email,
        phone,
        password,
        cpassword,
      };

      try {

        setLoading(true)
        const result = await axios.post("http://localhost:5000/api/users/register", user);
        setLoading(false)
        console.log(result.data);
        if(result.data.success){
             toast.success(result.data.massage)
             toast("Redirecting to Login page.")
             navigate("/login");
        }else{
            toast.error(result.data.massage)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error("Something went wrong")
      }
    
    }else{
      toast.error("Password dosen't match...")
    }
  }
  return (
    <div className="flex flex-col justify-center items-center bg-zinc-800" style={{ backgroundImage: `url(${signup})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
    {/* Sign In Button */}
    <a href="/blank-page" className="absolute top-0 right-5 m-6">
          <button className="text-white text-base font-semibold border border-solid border-transparent">
              Sign In
          </button>
      </a>
    {/* End of Sign In Button */}
    <div className="overflow-hidden px-8 pb-20 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex gap-10 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-full max-md:w-2/3">
          <div className="flex flex-col text-white leading-[150%] max-md:mt-10 max-md:max-w-full">
              <br></br>
            <img
              loading="lazy"
              src={logo} 
              className="mx-40 w-[600px] "
              alt="Farm fresh vegetables"
            />
            <br></br>
            
            <div className="mt-10 max-md:mt-0 ml-10 text-3xl font-extralight max-md:max-w-full" style={{ letterSpacing: '6px' }}>
              Farm fresh bounty awaits..
          </div>
          
          <div className="mt-6 max-md:mt-7 ml-10 text-8xl font-semibold max-md:max-w-full max-md:text-4xl" style={{ letterSpacing: '5px', lineHeight: '1.2' }}> {/* Added line-height */}
              Sign up &amp; shop now! 
          </div>

          </div>
        </div>
        <div className="flex flex-col w-full max-md:w-2/3 ml-0 max-md:ml-5">
          <form className="flex flex-col gap-4 px-11 py-16 mt-14 max-w-[32rem] bg-white rounded-2xl mx-auto max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="text-4xl font-bold text-neutral-900 tracking-[4.9px] mb-8 text-center">
              SIGN UP
            </div>
          <input type="text"
              className="px-5 py-4 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
              placeholder="Username"
              name="Username"
              autoComplete="username" 
          />
          <input type="email"
              className="px-5 py-4 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
              placeholder="Email"
              name="Email"
              autoComplete="email" 
          />
          <input type="tel"
              className="px-5 py-4 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
              placeholder="Phone Number"
              name="Phone Number"
          />
          <input type="password"
              className="px-5 py-4 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
              placeholder="Password"
              name="Password"
          />
          <input type="password"
              className="px-5 py-4 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
              placeholder="Retype Password"
              name="Retype Password"
          />

            <div className="text-xs text-black leading-4">
              By clicking Sign Up, you agree to our Terms, Privacy Policy,
              and Cookies Policy. You may receive SMS notifications from us
              and can opt out at any time.
            </div>
            <div className="text-base text-stone-950 mt-5 text-center">
              <span className="text-zinc-400">Already Registered? </span>Click
              Here
            </div>
            <button className="px-4 py-3 mt-7 text-md text-white bg-lime-600 border border-solid border-neutral-200 rounded-[36.683px] tracking-[2.52px] max-md:px-5 transition duration-500 ease-in-out transform hover:bg-lime-700 hover:scale-100">
SIGN UP
</button>


          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signupscreen