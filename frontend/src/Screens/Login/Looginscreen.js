import React ,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import './Css/Loginscreen.css'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"

function Looginscreen() {

  const[email , setemail]=useState('')
  const[password , setpassword]=useState('')

  return (
    <div className='container'>
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
  )
}

export default Looginscreen