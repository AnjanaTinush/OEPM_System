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

AOS.init({
  duration: 2500,
});
//read all users
function Allusers() {
  const [users, setusers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);

  const [duplicateusers, setduplicateusers] = useState([]);

  const [searchkey, setsearchkey] = useState();

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await axios.get(
        "http://localhost:5000/api/users/getallusers"
      );
      setusers(data.data);
      setduplicateusers(data.data); // Update duplicateusers with fetched data
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Add users popup form handle check
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
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function adduser(event) {
    event.preventDefault();

    if (password == cpassword) {
      if (phone.length !== 10) {
        toast.error("Phone number must be 10 digits.");
        return; // Exit the function if phone number is not valid
      }

      const user = {
        name,
        email,
        phone,
        password,
        cpassword,
      };

      try {
        setLoading(true)
        const result = await axios.post(
          "http://localhost:5000/api/users/register",
          user
         
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
    } else {
      toast.error("Password dosen't match");
    }
  }

  //delete specific user
  const deleteuser = async (id) => {
    try {
      setLoading(true);
      const confirmed = await Swal.fire({
        title: "Are you sure remove user?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
        fetchData(); // Reload data after successful deletion
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User deleted successfully!",
        });
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //search user using name

  // Search user using name and filter by type
function filterBySearch() {
  const filteredBySearch = duplicateusers.filter((user) =>
    user.name.toLowerCase().includes(searchkey.toLowerCase())
  );

  if (type !== "all") {
    const filteredByTypeAndSearch = filteredBySearch.filter(
      (user) => user.role && user.role.toLowerCase().includes(type)
    );
    setusers(filteredByTypeAndSearch);
  } else {
    setusers(filteredBySearch);
  }

  // Check if the filtered array is empty
  if (filteredBySearch.length === 0) {
    toast.error("User not found.");
  }
}

  const [type, settype] = useState("all");

  //search user according to user type
  function filterByType(e) {
    const selectedType = e.target.value.toLowerCase();
    settype(selectedType);
  
    if (selectedType !== "all") {
      const tempUsers = duplicateusers.filter(
        (user) => user.role && user.role.toLowerCase().includes(selectedType)
      );
      setusers(tempUsers);
    } else {
      setusers(duplicateusers);
    }
  }
  
  

  
  const generateReport = () => {
    // SweetAlert message before generating PDF
    Swal.fire({
      title: 'Generate PDF',
      text: 'Are you sure you want to generate the PDF report?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Generate',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with generating PDF
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const pdfName = `Users_Report_${currentDate}.pdf`;
  
        doc.setFontSize(20);
        doc.text("Users Report", 20, 20);
  
        // Date and Time above table heading
        doc.setFontSize(12);
        doc.text(`Date: ${currentDate}`, 20, 30);
        doc.text(`Time: ${currentTime}`, doc.internal.pageSize.getWidth() - 50, 30);
  
        const tableHeaders = [
          { content: "Name", styles: { fillColor: "#48c81b", textColor: "#ffffff" } },
          { content: "Email", styles: { fillColor: "#48c81b", textColor: "#ffffff" } },
          { content: "Phone", styles: { fillColor: "#48c81b", textColor: "#ffffff" } },
          { content: "Role", styles: { fillColor: "#48c81b", textColor: "#ffffff" } },
        ];
  
        const data = users.map(user => [
          user.name,
          user.email,
          user.phone,
          user.role,
        ]);
  
        doc.autoTable({
          startY: 40,
          head: [tableHeaders],
          body: data,
        });
  
        doc.save(pdfName);
        Swal.fire('PDF Generated!', '', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User canceled, do nothing or show a message
        Swal.fire('Cancelled', 'PDF generation cancelled', 'info');
      }
    });
  };
  
  
  
  


  return (
    <div>
     {loading ? (
                <Loader />
            ) : (
              <>
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
    Enter the user's details
  </h2>

  <form onSubmit={adduser} className="mt-8">
    <div>
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        required
      />
    </div>
    <div className="mt-4">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        required
      />
    </div>
    <div className="mt-4">
      <input
        type="tel"
        placeholder="Enter phone"
        value={phone}
        onChange={(e) => setphone(e.target.value)}
        onInput={(e) => {
          const maxLength = 10;
          if (e.target.value.length > maxLength) {
            toast.error("Phone number cannot exceed 10 digits.");
            e.target.value = e.target.value.slice(0, maxLength);
            setphone(e.target.value);
          }
        }}
        className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        required
        minLength={10}
        maxLength={10}
      />
    </div>
    <div className="mt-4">
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        required
      />
    </div>
    <div className="mt-4">
      <input
        type="password"
        placeholder="Confirm password"
        value={cpassword}
        onChange={(e) => setcpassword(e.target.value)}
        className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
        required
      />
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


<div className="flex justify-center items-center ml-48 h-full ">
  <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16 mb-4">
    {loading && <Loader />}
    <thead>
      <tr>
        <div className="flex items-center">
          {/*search ,filter and add button*/}
          <input
            type="text"
            placeholder="Search name..."
            className="mt-6 p-1 pl-10 block w-72 ml-10 mb-4  rounded-3xl dark:bg-table-row border-solid border-2 border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-110"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />

          <select
            id="countries"
            value={type}
            onChange={(e) => filterByType(e)}
            className="mt-2 p-1 mr-20 ml-20 block rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green dark:bg-table-row placeholder-gray-500 placeholder-opacity-50 font-custom text-md shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-110"
          >
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="employee manager">Employee manager</option>
            <option value="tunnel manager">Tunnel manager</option>
            <option value="financial manager">Financial manager</option>
            <option value="target manager">Target manager</option>
            <option value="Courior servise">Courier service</option>
            <option value="inventory manager">Inventory manager</option>
            <option value="machine manager">Machine manager</option>
          </select>

          <button className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:ring-Buttongreen mt-2  p-1 px-10 font-medium rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={generateReport}>
Generate Report
</button>

         
          <button
            type="button"
            className="text-white  ml-20 bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-10 py-1 text-center me-4 mt-3 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={openModal}
          >
            Add
          </button>
        </div>
      </tr>
    </thead>
    <table
      data-aos="zoom out"
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "
    >
      <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
        <tr>
          
          <th scope="col" className="px-6 py-3 text-center">
            name
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            email
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Phone
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            image
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            roll
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>

      <tbody>

        {/*user details table */}

        {users.length > 0 ? (
          users.map((user) => (
            <tr
              key={user._id}
              className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
            >
             
              <td className="px-6 py-4 text-green-900 left-0">{user.name}</td>
              <td className="px-6 py-4 text-green-900 left-0">{user.email}</td>
              <td className="px-6 py-4 font-medium text-green-900 left-0">
                {user.phone}
              </td>
              <td className="px-6 py-4 text-green-900 text-center">
                <img
                  className="w-10 rounded-full"
                  src={user.imageurl}
                  alt="profile"
                />
              </td>
              <td className="px-6 py-4 text-green-900 left-0">{user.role}</td>
              <td className="px-6 py-4  text-green-900 text-right">
                <Link to={`/e_updates/${user._id}`}>
                  <button className="btn1 mr-3">
                    <FaEdit className="mr-5 text-xl" />
                  </button>
                </Link>
                <button
                  className="btn1"
                  onClick={() => deleteuser(user._id)}
                >
                  <MdDeleteForever className="mr-5 text-2xl text-red-500" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-red-500">
              User not found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
              </>
            )}
    </div>
  );
}

export default Allusers;
