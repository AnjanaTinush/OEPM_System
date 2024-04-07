import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../Component/Loader";

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
    <div className="bg-wight-green">
      <div className="flex">
        {/* Side Navigation */}
        <Adminnavbar />

        <div className="flex flex-col w-full  justify-center">
          {Loading && <Loader />}
          <div className="max-w-lg mx-auto bg-white shadow-xl rounded-3xl mt-5 p-20 ">
            <h2 className="text-3xl font-semibold text-dark font-custom text-center ">
              Update user details
            </h2>
            <form className="mt-6" onSubmit={Updateuser}>
              <div>
          
                <input
                  type="text"
                  value={id}
                  className=" mt-1 p-3 block w-full md:w-96 rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                  readOnly
                />
              </div>
              <div className="mt-4">
                
                <input
                  type="text"
                  value={name}
                  className="mt-1 p-3 block w-full md:w-96 rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  value={email}
                  className="mt-1 p-3 block w-full md:w-96 rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  value={phone}
                  className="mt-1 p-3 block w-full md:w-96 rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                  required
                  onInput={(e) => {
                    if (e.target.value.length > 10) {
                      toast.error("Phone number cannot exceed 10 digits.");
                      e.target.value = e.target.value.slice(0, 10); // Truncate input to 10 digits
                      setphone(e.target.value);
                    }
                  }}
                />
              </div>

              {/*role selection tag */}
              <select
                id="countries"
                value={role} // set the selected value
                onChange={handleRoleChange} // handle the change event
                className="mt-4 p-3 block w-full md:w-96 rounded-3xl dark:bg-table-row border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
              >
                <option value="User">User</option>
                <option value="Employee manager">Employee manager</option>
                <option value="Tunnel manager">Tunnel manager</option>
                <option value="Financial manager">Financial manager</option>
                <option value="Target manager">Target manager</option>
                <option value="Courior servise">Courior servise</option>
                <option value="Inventory manager">Inventory manager</option>
                <option value="Machine manager">Machine manager</option>
              </select>

              <div className="flex justify-center">
                <button
                  type="submit"
                 
                  className="mt-4 p-3 md:w-40 text-white bg-dark hover:bg-darkhover font-custom text-md rounded-full"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Userupdate;
