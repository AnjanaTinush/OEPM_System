import React ,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import './Css/Loginscreen.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Navbar from '../../Component/Navbar';

AOS.init({
  duration:'500'
});

function Looginscreen() {

  const[email , setemail]=useState('')
  const[password , setpassword]=useState('')

  return (

    
<div><Navbar/>
    <div className='container' data-aos='zoom-out'>
    <div className="header">
      <div className="text">Login</div>
      <div className="underline"></div>
    </div>
    <div className="inputs">
      <div className="input">

       <div className="icon"> <MdEmail /></div>
         
        <input  type="email" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      </div>

      <div className="input">
        <div className="icon"> <RiLockPasswordFill /></div>

        <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      </div>
      <div className="forgot-password">Lost password?<span>Click here</span></div>
      <div className="submit-container">
        
        <div className= "submit" >Login</div>
      </div>
      <div className="newuser">New user ? <span><Link to={`/register`}>Sign up</Link></span></div>     
      </div>       
  </div>
  </div>
  )
}

export default Looginscreen