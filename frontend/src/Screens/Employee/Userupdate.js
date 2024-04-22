import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../Component/Loader";
import logo from "../../Images/logo.png"

const Userupdate = () => {
  //for selet tag for coose roll
  const handleRoleChange = (e) => {
    setroll(e.target.value);
  };

  const { userid } = useParams();

  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone,setphone]=useState("");
  const [role, setroll] = useState("");

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

  //updateuser function
  async function Updateuser(e) {
    e.preventDefault();

    const updateuser = {
      name,
      email,
      phone,
      role,
    };

    try {
      setLoading(true);
      const response = (
        await axios.put(
          `http://localhost:5000/api/users/updateuser/${userid}`,
          updateuser
        )
      ).data;
      console.log(response);
      setLoading(false);
      Swal.fire("Congratulations", "User updated successfully", "success").then(
        () => {
          window.location.href = "/e_allusers";
        }
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="">
      {Loading ? (
                <Loader />
            ) : (<>
            <div className="flex">
        {/* Side Navigation */}
        <Adminnavbar />
     
      
      
        <div data-aos="zoom in" className='ml-96'>
                  <div class="  relative    xl:max-w-3xl  md:mx-auto    mt-10 bg-wight-green shadow-xl rounded-lg text-gray-900">
                  <div class="rounded-t-lg h-32 overflow-hidden flex items-center justify-center">
    <img class="object-cover w-36 h-36" src={logo} alt="Logo"/>
</div>

             
              <div class="text-center mt-2">
                  <h1 className="text-2xl text-black-green italic ">Update User</h1>
              </div>
              
             
              <div class="p-4 border-t  mx-8 mt-2 mb-4">
              <div class="flex items-center justify-center p-12">
              
              <div class="mx-auto w-full max-w-[550px] bg-wight-green">
              <form onSubmit={Updateuser}>
    <div className="mb-5">
        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
            ID
        </label>
        <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
            type="text"
            value={id}
            readOnly
            required // Added required attribute
        />
    </div>
    <div className="mb-5">
        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
            Name
        </label>
        <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
            type="text"
            value={name}
            onChange={(e) => {
                setname(e.target.value);
            }}
            required // Added required attribute
        />
    </div>
    <div className="mb-5">
        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
            Email Address
        </label>
        <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 focus:outline-whatsapp-green px-6 text-base font-medium text-[#6B7280]"
            type="email"
            value={email}
            onChange={(e) => {
                setemail(e.target.value);
            }}
            required // Added required attribute
        />
    </div>
    <div className="mb-5">
        <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
            Phone Number
        </label>
        <input
            className="w-full rounded-md border border-[#e0e0e0] focus:outline-whatsapp-green bg-white py-3 px-6 text-base font-medium text-[#6B7280]"
            type="tel"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            onInput={(e) => {
                const maxLength = 10;
                const enteredValue = e.target.value.replace(/\D/g, '');
                if (enteredValue.length !== maxLength) {
                    toast.error("Phone number must be 10 digits.");
                    setphone(enteredValue.slice(0, maxLength));
                } else {
                    setphone(enteredValue);
                }
            }}
            minLength={10}
            maxLength={10}
            required // Added required attribute
        />
    </div>
    <div className="-mx-3 flex flex-wrap">
        <select
            id="countries"
            value={role}
            onChange={handleRoleChange}
            className="mt-4 p-3 block ml-3 w-full md:w-96 rounded-xl dark:bg-white border-none focus:outline-whatsapp-green font-custom text-md"
            required // Added required attribute
        >
            <option value="User">User</option>
            <option value="Employee manager">Employee manager</option>
            <option value="Tunnel manager">Tunnel manager</option>
            <option value="Financial manager">Financial manager</option>
            <option value="Target manager">Target manager</option>
            <option value="Courier service">Courier service</option>
            <option value="Inventory manager">Inventory manager</option>
            <option value="Machine manager">Machine manager</option>
        </select>
    </div>
    <div className="flex justify-center">
        <button
            type="submit"
            className="mt-4 p-3 md:w-96 text-white bg-dark hover:bg-darkhover font-custom text-md rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
            Update
        </button>
    </div>
</form>

              </div>
          </div>
              </div>
          
          </div>
          </div>
       
      </div>
            
            </>)}
      
    </div>
  );
};

export default Userupdate;
