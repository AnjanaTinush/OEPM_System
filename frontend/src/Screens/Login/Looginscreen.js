import React ,{useState,useEffect} from 'react'
import { Link, json } from "react-router-dom";
import axios from 'axios';
import './Css/Loginscreen.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../../Component/Navbar';
import toast from 'react-hot-toast';
import Loader from '../../Component/Loader';

AOS.init({
  duration:'500'
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

        if (role == 'User') {
          window.location.href = '/';
        } else if (role == 'Employee manager') {
          window.location.href = '/employeeDashboard';
        }else if (role == 'Tunnel manager') {
          window.location.href = '/tunneldashboard';
        } else if (role == 'Courior servise') {
          window.location.href = '/curiorservisedashboard';
        }else if (role == 'Target manager') {
          window.location.href = '/targetsdashboard';
        } else if (role =='Inventory manager') {
          window.location.href = '/inventorydasgboard';
        } else if (role == 'Financial manager') {
          window.location.href = '/financialdashboard';
        } else if (role == 'Machine manager') {
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
      toast.error('Something went wrong');
    }
  };
  
 
 return (

    
<div><Navbar/>
     {loading && <Loader/>}
    <form className='container' data-aos='zoom-out'>
    <div className="header">
      <div className="text">Login</div>
      <div className="underline"></div>
    </div>
   
    <div className="inputs">
      <div className="input">

       <div className="icon"> <MdEmail /></div>
         
        <input  type="email" placeholder='Email' required  value={email} onChange={(e)=>{setemail(e.target.value)}} />
      </div>

      <div className="input">
        <div className="icon"> <RiLockPasswordFill /></div>

        <input type="password" placeholder='Password' required  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      </div>
      <div className="forgot-password">Lost password?<span>Click here</span></div>
      <div className="submit-container">
        
        <div className= "submit" onClick={Login}>Login</div>
      </div>
     
      <div className="newuser">New user ? <span><Link to={`/register`}>Sign up</Link></span></div>     
      </div>       
  </form>
  </div>
  )
}

export default Looginscreen