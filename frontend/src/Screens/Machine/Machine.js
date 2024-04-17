
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Adminnavbar from "./Component/Adminnavbar";
import Loader from "../../Component/Loader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";


  

export default function Machine() {
    
    const [machine, setmachine] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [duplicatmachines, setduplicatemachines] = useState([]);
    const [details, setDetails] = useState({});
    
  
    const [searchkey, setsearchkey] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // const fetchData = async () => {
    //     try {
    //       setLoading(true)
    //       const data = await axios.get(
    //         "http://localhost:5000/api/machines/getallmachines"
    //       );
    //       setmachine(data.data);
    //       setduplicatemachines(data.data); // Update duplicateusers with fetched data
    //       setLoading(false)
    //     } catch (error) {
    //       console.log(error);
    //       setLoading(false)
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchData();
    //   }, []);

    
const modalRef = useRef(null);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};


      const toggleDetails = (topic) => {
        setDetails((prevState) => ({
          ...prevState,
          [topic]: !prevState[topic]
        }));
      };


//delete function
const handleDelete = async (machineId) => {
    try {
      await axios.delete(`http://localhost:5000/api/machines/deletemachine/${machineId}`);
      // If deletion is successful, update the machines list
      setmachine(machine.filter((machine) => machine._id !== machineId));
    } catch (error) {
      console.log('Error deleting machine:', error);
      // Optionally, display an error message to the user
    }
  };

  //getting all machines
  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await axios.get(
        "http://localhost:5000/api/machines/getallmachines"
      );
      setmachine(data.data);
      setduplicatemachines(data.data); // Update duplicateusers with fetched data
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


//add new machine
const [name, setname] = useState('');
const [cost, setCost] = useState(['']);
const [parts, setParts] = useState(['']);
const [discription, setDiscript] = useState('');
const [location, setLocation] = useState('');

const handleCostChange = (index, value) => {
    const newCost = [...cost];
    newCost[index] = value;
    setCost(newCost);
  };

  const handlePartsChange = (index, value) => {
    const newParts = [...parts];
    newParts[index] = value;
    setParts(newParts);
  };

  const addCostInput = () => {
    setCost([...cost, '']);
  };

  const addPartsInput = () => {
    setParts([...parts, '']);
  };

async function addMachine(event) {
    event.preventDefault();

    

      const machine = {
        name,
        cost,
        parts,
        discription,
        location
      };

      try {
        setLoading(true)
        const result = await axios.post(
          "http://localhost:5000/api/machines/add",
          machine
         
        );

        console.log(result.data);
        closeModal();
        Swal.fire("Congratulations", "User added successfully", "success").then(
          () => {
            window.location.reload();
          }
        );
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    
  }
  function filterBySearch() {
    const tempuser = duplicatmachines.filter((user) =>
      user.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setmachine(tempuser);

    // Check if the filtered array is empty
    if (tempuser.length === 0) {
      toast.error("machine not found.");
    }
  }

  const locations = ['poly_tunnel_01', 'poly_tunnel_02', 'poly_tunnel_03', 'Inventory', 'Vehicle'];
  return (
    
      <div lassName='bg-wight-green'>
         {loading ? (
        <Loader />
      ) : (
        <div className='bg-wight-green'>
    

    <div className="flex">
  {/* Side Navigation */}
  <Adminnavbar />

  {isModalOpen && (
// Popup form
<div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
<div
ref={modalRef}
className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-md"
>
<div className="px-12 py-12">
  <h2 className="text-xl font-semibold text-dark font-custom">
    Enter the machine's details
  </h2>

  <form onSubmit={addMachine} className="mt-8">
    <div>
      <input
        type="text"
        placeholder="Enter machine name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        required
      />
    </div>
    <div className="mt-4">
    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="parts">
          Parts
        </label>
        {cost.map((value, index) => (
          <input
            key={index}
            className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            value={value}
            onChange={(e) => handleCostChange(index, e.target.value)}
          />
        ))}
      <button
          className="px-4 py-2 font-bold text-white rounded bg-whatsapp-green hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => addCostInput()}
        >
          Add Cost
        </button>
    </div>

    
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="parts">
          Parts
        </label>
        {parts.map((value, index) => (
          <input
            key={index}
            className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            value={value}
            onChange={(e) => handlePartsChange(index, e.target.value)}
          />
        ))}
        <button
          className="px-4 py-2 font-bold text-white rounded bg-whatsapp-green hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => addPartsInput()}
        >
          Add Parts
        </button>
      </div>
    

    <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
         discription
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="discription"
          type="text"
          value={discription}
          onChange={(e) => setDiscript(e.target.value)}
        />
      </div>

      <div className="mt-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="location">
                          Location
                        </label>
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-whatsapp-green focus:border-whatsapp-green sm:text-sm"
                          required
                        >
                          <option value="">Select location</option>
                          {locations.map((loc, index) => (
                            <option key={index} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
    

    <div className="mt-8 mb-2">
      <button
        type="submit"
        className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
      >
        Submit
      </button>
    </div>
  </form>
</div>
</div>
</div>
)}
  <div className="flex flex-col w-full">
    
    <br></br>
    <br></br>
    <br></br>
    
    <div>

<div class="relative mt-2 rounded-md shadow-sm w-2/6 float-right p-3">
  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    <span class="text-gray-500 sm:text-sm">
      
    </span>
  </div>
  <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search" 
  value={searchkey}
  onChange={(e) => {
    setsearchkey(e.target.value);
  }}
  onKeyUp={filterBySearch}

  />
  <div class="absolute inset-y-0 right-0 flex items-center">
    
    <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
      <option>machines</option>
      <option>Sensors</option>
      <option>Vehicals</option>
    </select>
  </div>
</div>
</div>


    
    <div className="flex items-center justify-end h-full mr-20 ">
        {/* Use Link component to navigate */}
        <Link to="/m_MachinePdf">
          <button
            type="submit"
            class="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl max-w-md mx-auto"
          >
           print machine details
          </button>
          </Link>
      </div>
       
       
      <div className="flex items-center justify-end h-full mr-20 ">
        {/* Use Link component to navigate */}
        
          <button
            type="submit"
            class="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl max-w-md mx-auto"
            onClick={openModal}
          >
             Click Here to Add a machine
            
          </button>
        
      </div>


  <div>
      <div>
      {machine.map((machine) =>  (
      <div class="relative block float-right w-4/6 h-4/5 bg-white rounded-lg p-10 m-20 border-y-4 border-whatsapp-green drop-shadow-2xl">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
      
      <div class="row-span-1 ...  bg-whatsapp-green rounded-lg  px-5 py-2.5 text-center me-2 mb-2 h-10 ">
        <h class="font-serif text-2xl text-black text-center">{machine.name}</h></div>
      <div class="row-span-2  ... bg-white w-50 h-50">
      
                              {/* <img class="w-16 md:w-36 lg:w-48 p-2" src={machine.imageurls} alt='xxxx' /> */}
                             
                              
        
        <button>
          <div class="text-white object-left-bottom relative inline-block bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl"  
          onClick={() => handleDelete(machine._id)}
          >
          DELETE
        </div></button>
        
        
<button>
    <Link to={`/m_update/${machine._id}`}>
<div class="text-white object-bottom relative inline-block bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl">
          UPDATE

        </div>
</Link>
</button>
        
                  </div>
        
      <div class="row-span-3 col-span-3... gap-4">
      <div class="gap-6">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDetails('topic1')}>
              <div className="h-10 font-serif text-xl text-black">Cost for the machine parts</div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${details.topic1 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            {details.topic1 && (
           
              <>
                <div class="font-serif text-l text-sky-400">{machine.cost[0]}</div>
                <div class="font-serif text-l text-sky-400">{machine.cost[1]}</div>
                <div class="font-serif text-l text-sky-400">{machine.cost[2]}</div>
              </>
              
            )}

      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDetails('topic2')}>
              <div className="h-10 font-serif text-xl text-black">machine parts</div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${details.topic2 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            {details.topic2 && (
              <>
                <div class="font-serif text-l text-sky-400" >{machine.parts[0]}</div>
                <div class="font-serif text-l text-sky-400">{machine.parts[1]}</div>
                <div class="font-serif text-l text-sky-400">{machine.parts[2]}</div>
              </>
            )}
            
            {/* <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDetails('topic3')}>
              <div className="h-10 font-serif text-2xl text-white">machine details</div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${details.topic3 ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            {details.topic3 && (
              <>
                <div font-serif text-2xl text-sky-400>Detail 1 for topic 02</div>
                <div>Detail 2 for topic 02</div>
                <div>Detail 3 for topic 02</div>
              </>
            )} */}
              
              <div className="h-10 font-serif text-xl text-black">
                    discription
              </div>
              <li  class="font-serif text-l text-sky-400">
                {machine.discription}
              </li>
              </div>
              
      </div>
      </div>
      </div>
      ))}

</div>
</div>


</div>
</div>



</div>
      )}
      </div>
   
  )
}


