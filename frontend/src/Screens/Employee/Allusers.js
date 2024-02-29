import React, { useEffect, useState,useRef } from 'react'
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from './Component/Adminnavbar'
import Navbar from './Component/Navbar'
import Loader from '../../Component/Loader';
import Userupdate from './Userupdate';

function Allusers() {
 

  //Add users popup form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    closeModal(); // Close the modal after form submission
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

//add users 
  const[name , setname]=useState('')
  const[email , setemail]=useState('')
  const[phone , setphone]=useState('')
  const[password , setpassword]=useState('')
  const [cpassword, setcpassword] = useState('');

const [Loading,setLoading] = useState(false)


 async function adduser(event){
  event.preventDefault();

  if(password==cpassword){
    const user = {
      name,
      email,
      phone,
      password,
      cpassword,
    };

    try {
      setLoading(true);
      const result = await axios.post("http://localhost:5000/api/users/register",user);
      setLoading(false);
      console.log(result.data);
      closeModal();
      window.location.reload()

    } catch (error) {

      console.log(error)
      setLoading(false)  
    }

  }else{
    alert("Password dosen't match...")
  }

 }



//read data
const [users,setusers] = useState([]);

const  fetchData = async() =>{

      try {
        const data = await axios.get("http://localhost:5000/api/users/getallusers");
        setusers(data.data)
        
      } catch (error) {
        console.log(error)
      }  
};

useEffect(()=>{
  fetchData();
},[]);




//delete users
async function deleteuser(id){

  try {
    setLoading(true);
    const response = (await axios.delete(`http://localhost:5000/api/users/delete/${id}`)).data
    setLoading(false);
    console.log(response)
    window.location.reload()
  } catch (error) {
    console.log(error)
    setLoading(false);
  }

}





  return (
    <div className='bg-wight-green'>
        <div className="flex">
      {/* Side Navigation */}
      <Adminnavbar />

      <div className="flex flex-col w-full">
        {/* Top Navigation */}
        <Navbar />
        <br></br>
        <br></br>
      
       
       


        <div className="flex justify-end items-center mr-20 h-full ">
            <button
              type="button"
              class="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
              onClick={openModal}
            >
              Click Here to Add a Users
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
             
              <div
                ref={modalRef}
                className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-md"
              >
                <div className="px-12 py-12">
               

                  
                  <h2 className="text-xl font-semibold text-dark font-custom  ">
                    Enter the users details
                  </h2>
                  {Loading && (<Loader/>)}
                  <form onSubmit={handleSubmit} className="mt-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter user name"
                        value={name}
                        onChange={(e)=>{setname(e.target.value)}}
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                       
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e)=>{setemail(e.target.value)}}
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="password"
                        placeholder="Enter passwoard"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                       
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="password"
                        placeholder="confirm password"
                        value={cpassword}
                        onChange={(e)=>setcpassword(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                       
                      />
                    </div>

                    <div className="mt-8 mb-2">
                      <button
                        type="submit"
                        className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
                      
                        onClick={(e)=>adduser(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
       
       
       
       
       
       
        <div className="flex justify-center items-center h-full">
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              image
            </th>
            <th scope="col" className="px-6 py-3">
              roll
            </th>
            <th scope="col" className="px-6 py-3">
             Action
            </th>
          </tr>
        </thead>
       
        <tbody>
          {users.length > 0 && 
          users.map((users)=>(
          <tr className="bg-white dark:bg-table-row  hover:tablerow-hover dark:hover:bg-tablerow-hover">
            <td className="px-6 py-4 font-medium text-green-900 ">
            {users._id}
            </td>
            <td className="px-6 py-4 text-green-900">
              {users.name}
            </td>
            <td className="px-6 py-4 text-green-900">
              {users.email}
            </td>
            <td className="px-6 py-4 text-green-900">
              <img className='w-10 rounded-full '
              src={users.imageurl}
              alt='profile'
              />
            </td>
            <td className="px-6 py-4 text-green-900">
              {users.role}
            </td>
            <td className="px-6 py-4 text-right text-green-900">
            <Link to={`/e_updates/${users._id}`}>
  <button className="btn1 mr-3"  >
    <FaEdit className="mr-5 text-xl"  />
  

  </button>
</Link>


            <Link to={`#`}> 
                      <button className="btn1" onClick={(e)=>deleteuser(users._id)}><MdDeleteForever   className="mr-5 text-2xl " />
            </button>
            </Link>  
          </td>
          </tr>
         ))}
        </tbody>
      </table>

      
     

    </div>
    
    </div>
    <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      
      
    </div>
    </div>


    </div>
  )
}

export default Allusers;



    