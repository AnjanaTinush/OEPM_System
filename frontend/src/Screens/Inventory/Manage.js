import React, { useState, useRef, useEffect } from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from '../././Component/Navbar'
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom";
import {useReactToPrint} from "react-to-print"
import toast from "react-hot-toast";

import axios from "axios";





function Manage() {

  const ComponentPDF = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
 
  const [searchKey, setSearchKey] = useState("");
  const [duplicateitem, setduplicateitem] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

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

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [imageurl, setimageurl] = useState("");

  //add item
  async function item(){
    const item = {
        name,
        price,
        quantity,
        imageurl
    };

console.log(item);


try {
    const result = 
      await axios.post("http://localhost:5000/api/inventory/additems", item)
    .data;
    console.log(result.data);
    alert("Item added successfully");
  } catch (error) {
    console.log(error);
  }
  }

  //read
  const [items,setitems] = useState([]);

const  fetchData = async() =>{

      try {
        const data = await axios.get("http://localhost:5000/api/inventory/getallitems");
        setitems(data.data)
        setduplicateitem(data.data)
      } catch (error) {
        console.log(error)
      }  
};

//delete
useEffect(()=>{
  fetchData();
},[]);

async function deleteitem(id){
  try {
    const response = (await axios.delete(`http://localhost:5000/api/inventory/delete/${id}`)).data
    console.log(response)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}




function filterBySearch() {
  const tempitem = duplicateitem.filter((items) =>
  items.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  setitems(tempitem);

  // Check if the filtered array is empty
  if (tempitem.length === 0) {
    toast.error("Item not found.");
  }
}











const generatePDF = useReactToPrint({

  content: () => ComponentPDF.current,
  documentTitle:"Userdata",
  
});


  return (
<div className="bg-wight-green h-screen flex flex-col">
      <div className="flex">
        {/* Side Navigation */}
        <Adminnavbar />

        <div className="flex flex-col w-full">
          {/* Top Navigation */}
          <Navbar />
          <br></br>
          <br></br>
          <br></br>
          
          <div className="flex justify-center items-center">
  <input
    type="text"
    placeholder="Search Items"
    className="p-3 pl-6 rounded-3xl dark:bg-table-row border-solid border-5 border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-sm focus:border-transparent" // Added focus:border-transparent
    style={{ width: "775px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", marginRight: "40px" }}
    value={searchKey}
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                  }}
                  onKeyUp={filterBySearch}
  />
  <button
    type="button"
    className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-light rounded-full text-2xl px-6 py-4 text-center me-2 mb-2 mt-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-md" // Increased font size to text-2xl
    onClick={openModal}
    style={{ borderRadius: "50%" }} // Apply circular border radius
  >
    +
  </button>
</div>











<br></br>




          <div className="flex justify-center items-center h-full">
            <div className="overflow-x-auto shadow-xl sm:rounded-lg">
             <div ref = {ComponentPDF} style={{width:'100%'}}>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image URL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
  {item && (items.map((item) => {
        return <tr className="bg-white dark:bg-table-row  dark:hover:bg-tablerow-hover">
         <td className="px-6 py-4 font-medium text-green-900 ">{item._id}</td>
        <td className="px-6 py-4 font-medium text-green-900 ">{item.name}</td>
        <td className="px-6 py-4 font-medium text-green-900 ">{item.price}</td>
        <td className="px-6 py-4 font-medium text-green-900 ">{item.quantity}</td>
        <td className="px-6 py-4 font-medium text-green-900 "><img className='w-10 rounded-full '
              src={item.imageurl}
              alt='profile'
              /></td>
        <td className="px-6 py-4 text-right text-green-900">
        <Link to={`/i_update/${item._id}`}>
                      <button className="btn1 mr-3"><FaEdit    className="mr-5 text-xl" />
            </button>
            </Link> 
            <Link to="#">
                      <button className="btn1" onClick={(e)=>deleteitem(item._id)}><MdDeleteForever   className="mr-5 text-2xl " />
            </button>
            </Link>  

        </td>
      </tr>
}))}
</tbody>
              </table>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        
          <div className="flex justify-center items-center h-full">            
  <button
    type="button"
    className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-light rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-md focus:border-transparent"
    onClick={generatePDF}
  >
    Export as PDF
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
                  <span
                    className="close absolute top-0 right-0 mt-2 mr-4 cursor-pointer"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <h2 className="text-xl font-semibold text-dark font-custom  ">
                    Enter the Tunnel Details
                  </h2>
                  <form className="mt-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Price"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={price}
                        onChange={(e) => {
                          setprice(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="number"
                        placeholder="Enter Quanity"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={quantity}
                        onChange={(e) => {
                          setquantity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter Image URL"
                        className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                        value={imageurl}
                        onChange={(e) => {
                          setimageurl(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-8 mb-2">
                      <button
                        type="submit"
                        className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
                       onClick={item}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <br></br>
          <br></br>

        </div>
      </div>
    </div>
  )
}

export default Manage
