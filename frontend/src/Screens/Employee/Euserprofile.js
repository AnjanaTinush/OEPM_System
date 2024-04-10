import React, { useState, useEffect } from "react";
import axios from "axios";
import AdprofileNavbar from './Component/AdprofileNavbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init({
  duration:2000
});



function Euserprofile() {

    const user = JSON.parse(localStorage.getItem('currentuser'));
    const { userid } = useParams();

    const [id, setid] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone,setphone]=useState("");
    const [role, setroll] = useState("");
    const [password, setpassword] = useState("");

    const [Loading, setLoading] = useState(false);

    //take data for update
    useEffect(() => {
      async function getUser() {
        try {
          setLoading(true);
          const response = (
            await axios.post(`http://localhost:5000/api/users/getuser/${userid}`)
          ).data;
          setLoading(false);
          console.log(response.user);
          setid(response.user._id);
          setname(response.user.name);
          setemail(response.user.email); // Corrected typo here
          setphone(response.user.phone);
          setroll(response.user.role);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
      getUser();
    }, []);
  
  
    
    const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};


  const fetchData = async () => {
    if (!user) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
       
        <AdprofileNavbar/>
        
<div data-aos="zoom in" className='ml-52'>
        <div class="  relative    xl:max-w-3xl  md:mx-auto    mt-16 bg-wight-green shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden">
        <img class="object-cover object-top w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX8YL6SsBZOPNhDicskCaz23ne66gswvopcTClAwkLBTm16E-5MUnTUWYXpKSzwm49U10&usqp=CAU" alt="Logo"/>
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img class="object-cover object-center h-32 " src={user.imageurl} alt='Woman looking front'/>
    </div>
    <div class="text-center mt-2">
        <h2 class="font-semibold">{user.name}</h2>
        <p class="text-gray-500">{user.role}</p>
    </div>
    <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
    <li className="flex flex-col items-center justify-around">
    <Link to={`/e_editprofile/${user._id}`}>
                        <button className="btn1 mr-3">
                          <FaEdit className="mr-5 text-xl" />
                        </button>
                      </Link>
        </li>
       
        <li class="flex flex-col items-center justify-around">
        <Link to={`/`}>
                        <button className="btn1 mr-3">
                          <MdDeleteForever className="mr-5 text-xl" />
                        </button>
                      </Link>
        </li>
    </ul>
    <div class="p-4 border-t  mx-8 mt-2 mb-4">
    <div class="flex items-center justify-center p-12">
    
    <div class="mx-auto w-full max-w-[550px] bg-wight-green">
        <form>
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                     Name
                </label>
                <input type="text" name="name" id="name" 
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    value={user.name}
                    readOnly/>
            </div>
            <div class="mb-5">
                <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                </label>
                <input type="email" name="email" id="email" 
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    value={user.email}
                    readOnly/>
            </div>
            <div class="mb-5">
                <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input type="text" name="phone" id="phone"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={user.phone} 
                    readOnly/>
            </div>
           
            <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                        <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
                           Role
                        </label>
                        <input type="text" name="date" id="role"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                            value={user.role}
                            readOnly/>
                    </div>
                </div>
                <div class="mb-5 relative">
    <label for="password" class="mb-3 block text-base font-medium text-[#07074D]">
        Password
    </label>
    <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        value={user.password}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 pr-12 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        // value={user.password} Remove value attribute for password fields
         readOnly/>
    <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 mt-10 right-0 flex items-center px-2 focus:outline-none"
    >
        {showPassword ? (
            <FaEyeSlash className="text-gray-400" />
        ) : (
            <FaEye className="text-gray-400" />
        )}
    </button>
</div>

            </div>

           

            
        </form>
    </div>
</div>
    </div>

</div>
</div>
    </div>
  )
}

export default Euserprofile