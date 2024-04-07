import React ,{useState,useEffect} from 'react'
import { Link, json } from "react-router-dom";
import axios from 'axios';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../../Component/Navbar';
import toast from 'react-hot-toast';
import Loader from '../../Component/Loader';
import bgimg1 from './Componenet/bgimg1.png';

AOS.init({
  duration:'1000'
});

function Looginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);


 
  const Login = async () => {
    const userCredentials = {
      email,
      password,
    };

    try {
      setloading(true);
      const result = await axios.post('http://localhost:5000/api/users/login', userCredentials);
      setloading(false);

      localStorage.setItem('currentuser', JSON.stringify(result.data.user));

      // Check the success property in the response
      if (result.data.success) {
        // Update the user state and redirect
        const role = result.data.user.role;

        if (role === 'User') {
          window.location.href = '/c_displayitem';
          
        } else if (role ==='Employee manager') {
          window.location.href = '/employeeDashboard';
         
        }else if (role === 'Tunnel manager') {
          window.location.href = '/tunneldashboard';
        } else if (role === 'Courior servise') {
          window.location.href = '/curiorservisedashboard';
        }else if (role === 'Target manager') {
          window.location.href = '/targetsdashboard';
        } else if (role ==='Inventory manager') {
          window.location.href = '/inventorydasgboard';
        } else if (role === 'Financial manager') {
          window.location.href = '/financialdashboard';
        } else if (role === 'Machine manager') {
          window.location.href = '/machinedashboard';
        } else {
          // Handle other roles or scenarios as needed
          console.error('Unsupported role:', role);
        }
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(' Invalid credintial');
    }
  };
  
 
 return (
<div>
{loading && <Loader />}
  <div data-aos="zoom in"
  className='bg-cover  bg-center min-h-screen bg-local' style={{ backgroundImage: `url(${bgimg1})` }}
>
  <Navbar/>
 


  <div  className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 border border-white rounded-xl p-10 text-white w-1/3">
    <h1 className="text-3xl font-bold tracking-widest text-center mb-8">LOGIN</h1>
    <div className="flex flex-col space-y-6 mb-4 "  >
      <input
       type="email"
          placeholder='Email'
          required
          value={email}
          onChange={(e) => { setemail(e.target.value) }}
        className="w-full px-4 py-3 rounded-full bg-white/20 border border-gray-300 placeholder-white placeholder-opacity-50 focus:ring-white/50"
      />
      <input
        type="password"
        placeholder='Password'
        required
        value={password}
        onChange={(e) => { setpassword(e.target.value) }}
        className="w-full px-4 py-3 rounded-full bg-white/20 border border-gray-300 placeholder-white placeholder-opacity-50 focus:ring-white/50"
      />
    </div>
    <div className="text-sm text-center cursor-pointer hover:text-white/70 mb-6"
        
    >
      Lost Password? <span className="font-semibold">Click Here</span>
    </div>
    <button
      className="w-full py-3 rounded-full border border-white font-light text-lg tracking-wider hover:bg-white/20"
      onClick={Login}
    >
      Login
    </button>
  </div>
</div>

</div>
  )
}

export default Looginscreen