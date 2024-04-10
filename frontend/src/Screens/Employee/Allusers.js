import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Adminnavbar from "./Component/Adminnavbar";
import Loader from "../../Component/Loader";
import { jsPDF } from "jspdf";
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
      const data = await axios.get(
        "http://localhost:5000/api/users/getallusers"
      );
      setusers(data.data);
      setduplicateusers(data.data); // Update duplicateusers with fetched data
    } catch (error) {
      console.log(error);
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
      } catch (error) {
        console.log(error);
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //search user using name

  function filterBySearch() {
    const tempuser = duplicateusers.filter((user) =>
      user.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setusers(tempuser);

    // Check if the filtered array is empty
    if (tempuser.length === 0) {
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
  
  

  
  const generatereport = () => {
    
       
    // Open a new window
    const printWindow = window.open("", "_blank", "width=600,height=600");

    // Write HTML content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Users Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
            }

            h1 {
              text-align: center;
              margin-bottom: 20px;
              color: #132A13;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              background-color: #fff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }

            th, td {
              padding: 12px 15px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }

            th {
              background-color: #48c81b;
              color: white; /* Changed text color to white */
              text-transform: uppercase;
            }

            tr {
              background-color: #C5D7C9; /* Changed all row color */
            }

            /* Added style for right-aligned time */
            .date-time {
              display: flex;
              justify-content: space-between;
            }

            /* Added style for right-aligned time */
            .right-align {
              text-align: right;
            }
          </style>
        </head>
        <body>
          <h1>Users Report</h1>
        
          
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              ${users
                .map(
                  (user, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>${user.phone}</td>
                      <td>${user.role}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
};

  


  return (
    <div>
      <Adminnavbar />

      {isModalOpen && (
        //popup form
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
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    onInput={(e) => {
                      if (e.target.value.length > 10) {
                        toast.error("Phone number cannot exceed 10 digits.");
                        e.target.value = e.target.value.slice(0, 10); // Truncate input to 10 digits
                        setphone(e.target.value);
                      }
                    }}
                    className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                    min="1000000000"
                    max="9999999999"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Enter passwoard"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="confirm password"
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md "
                  />
                </div>

                <div className="mt-8 mb-2">
                  <button
                    type="submit"
                    className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-dark dark:hover:bg-darkhover"
                    onClick={(e) => adduser(e)}
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
                  className="mt-6 p-1 pl-10 block w-72 ml-10 mb-4  rounded-3xl dark:bg-table-row border-solid border-2 border-gray focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md shadow-2xl"
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
                  className="mt-2 p-1 mr-20 ml-20 block rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green dark:bg-table-row placeholder-gray-500 placeholder-opacity-50 font-custom text-md shadow-2xl"
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

                <button className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:ring-Buttongreen mt-2  p-1 px-10 font-medium rounded-full"
                onClick={generatereport}>
  Generate Report
</button>

               
                <button
                  type="button"
                  className="text-white  ml-20 bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-10 py-1 text-center me-4 mt-3 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-2xl"
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
                        <MdDeleteForever className="mr-5 text-2xl" />
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
    </div>
  );
}

export default Allusers;
