import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Adminnavbar from './Component/Adminnavbar';
import Loader from '../../Component/Loader';
import { CiSearch } from "react-icons/ci";
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 2500,
});
//read users
function Allusers() {
  const [users, setUsers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await axios.get('http://localhost:5000/api/users/getallusers');
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
 

  //add users for the System
  const[name , setname]=useState('')
  const[email , setemail]=useState('')
  const[phone , setphone]=useState('')
  const[password , setpassword]=useState('')
  const [cpassword, setcpassword] = useState('');



  async function adduser(event) {
    event.preventDefault();
  
    if (password == cpassword) {
      const user = {
        name,
        email,
        phone,
        password,
        cpassword,
      };
  
      try {
        const result = await axios.post("http://localhost:5000/api/users/register", user);
  
        console.log(result.data);
        closeModal();
        Swal.fire(
          "Congratulations",
          "User added successfully",
          "success"
        ).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Password dosen't match");
    }
  }
  




  //delete user
  const deleteuser = async (id) => {
    try {
      setLoading(true);
      const confirmed = await Swal.fire({
        title: 'Are you sure remove user?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmed.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
        fetchData(); // Reload data after successful deletion
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User deleted successfully!',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

//search user
const [searchuser, setsearchuser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div >
      <Adminnavbar />
   
     
   
      <div className='flex justify-between items-center mx-20  h-full mt-10'>
    <input
    
        type="text"
        placeholder="Search  name..."
        className="mt-4 p-2 pl-10 block w-72 ml-64 mb-4 rounded-3xl bg-wight-green border-solid border-2 border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    
    <button
        type="button"
        className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-6 py-1 text-center me-2 mb-0 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"
        onClick={openModal}
    >
        Add
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

      <div className='flex justify-center items-center ml-48 h-full '>
        <div className='overflow-x-auto shadow-2xl sm:rounded-lg ml-16 mb-4'>
          {loading && <Loader />}
          <table data-aos='zoom out' className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green'>
           
              <tr>
                <th scope='col' className='px-6 py-3'>
                  id
                </th>
                <th scope='col' className='px-6 py-3'>
                  name
                </th>
                <th scope='col' className='px-6 py-3'>
                  email
                </th>
                <th scope='col' className='px-6 py-3'>
                  image
                </th>
                <th scope='col' className='px-6 py-3'>
                  roll
                </th>
                <th scope='col' className='px-6 py-3'>
                  Action
                </th>
              </tr>
           
            </thead>

            <tbody>
            {filteredUsers.length === 0 ? (
  <tr>
    <td colSpan="6" className="px-6 py-4 text-center text-red-500">
      User not found...
    </td>
  </tr>
) : (
            filteredUsers.map((user) => (
             
                  <tr key={user._id} className='bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover'>
                    <td className='px-6 py-4 font-medium text-green-900'>{user._id}</td>
                    <td className='px-6 py-4 text-green-900'>{user.name}</td>
                    <td className='px-6 py-4 text-green-900'>{user.email}</td>
                    <td className='px-6 py-4 text-green-900'>
                      <img className='w-10 rounded-full' src={user.imageurl} alt='profile' />
                    </td>
                    <td className='px-6 py-4 text-green-900'>{user.role}</td>
                    <td className='px-6 py-4 text-right text-green-900'>
                      <Link to={`/e_updates/${user._id}`}>
                        <button className='btn1 mr-3'>
                          <FaEdit className='mr-5 text-xl' />
                        </button>
                      </Link>
                      <button className='btn1' onClick={() => deleteuser(user._id)}>
                        <MdDeleteForever className='mr-5 text-2xl' />
                      </button>
                    </td>
                  </tr>
                )))}
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Allusers;
