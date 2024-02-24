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

AOS.init({
  duration:'500'
});


function Signupscreen() {

    const[name , setname]=useState('')
    const[email , setemail]=useState('')
    const[phone , setphone]=useState('')
    const[password , setpassword]=useState('')
    const [cpassword, setcpassword] = useState('');

    const [Loading,setLoading] = useState(false)

   
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
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    
    }else{
      alert("Password dosen't match...")
    }
  }
  return (
    <div>
      
     <Navbar/>

     {Loading && (<Loader/>)}

     <form className='container' data-aos='' >

  <div className="header">
    <div className="text">Sign up</div>
    <div className="underline"></div>
  </div>
  <div className="inputs">
    <div className="input">
      <div className="icon"><FaUser /></div>
      <input type="text" placeholder='Username' value={name} onChange={(e) => { setname(e.target.value) }} />
    </div>

    <div className="input">
      <div className="icon"><MdEmail /></div>
      <input type="email" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
    </div>

    <div className="input">
      <div className="icon"><FaPhoneVolume /></div>
      <input type="number" placeholder='Phone Number ' value={phone} onChange={(e) => { setphone(e.target.value) }} />
    </div>

    <div className="input">
      <div className="icon"><RiLockPasswordFill /></div>
      <input type="password" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
    </div>

    <div className="input">
        <div className="icon"><RiLockPasswordFill /></div>
        <input type="password" placeholder='Confirm Password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
    </div>

    <div className="submit-container">
          <div className="submit">
          <button type="submit" onClick={(e) => registeruser(e)}>Sign up</button>
          </div>
        </div>

  </div>
</form>

</div>
  )
}

export default Signupscreen