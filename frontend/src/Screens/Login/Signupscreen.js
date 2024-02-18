import React , {useState , useEffect} from 'react'
import './Css/Signupscreen.css'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Navbar from '../../Component/Navbar';

AOS.init({
  duration:'500'
});








function Signupscreen() {

    const[name , setname]=useState('')
    const[email , setemail]=useState('')
    const[phone , setphone]=useState('')
    const[password , setpassword]=useState('')
    const[cpassword , setcpassward]=useState('')

  return (
    <div>
      
     <Navbar/>

    <div className='containe'data-aos='zoom-out'>
<div className="header">
 <div className="text">Sign up</div>
 <div className="underline"></div>
</div>
<div className="inputs">

<div className="input">
<div className="icon"><FaUser /></div>
   <input type="text" placeholder='Username' value={name} onChange={(e)=>{setname(e.target.value)}}/>
 </div>

 <div className="input">
 <div className="icon"><MdEmail /></div>
   <input type="email" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
 </div>

 <div className="input">
 <div className="icon"><FaPhoneVolume /></div>
   <input type="number" placeholder='Phone Number ' value={phone} onChange={(e)=>{setphone(e.target.value)}}/>
 </div>

 <div className="input">
   <div className="icon"><RiLockPasswordFill /></div>
   <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
 </div>

 <div className="input">
 <div className="icon"><RiLockPasswordFill /></div>
   <input type="password" placeholder='Comfirm Password' value={cpassword} onChange={(e)=>{setcpassward(e.target.value)}} />
 </div>

 <div className="submit-container">
   
   <div className= "submit" >Sign up</div>
 </div>
     
 </div>       
</div>
</div>
  )
}

export default Signupscreen