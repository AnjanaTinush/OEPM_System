import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminnavbar from "./Component/Adminnavbar";
import Swal from "sweetalert2";
import Loader from "../../Component/Loader";
import { useParams } from "react-router-dom";

const MachineUpdate = () => {
  const { mid } = useParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [parts, setParts] = useState("");
  const [discription, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function getMachine() {
      try {
        setLoading(true);
        const response = (await axios.get(`http://localhost:5000/api/machines/getMachine/${mid}`)).data;
        console.log(response.machine)
        setId(response.machine._id);
        setName(response.machine.name);
        setCost(response.machine.cost);
        setParts(response.machine.parts);
        setDescription(response.machine.discription);
        setLocation(response.machine.location);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getMachine();
  }, [mid]);

  const updateMachine = async (e) => {
    e.preventDefault();
    const updatedMachine = {
      name,
      cost,
      parts,
      discription,
      location 
    };
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/machines/updateMachine/${mid}`, updatedMachine);
      setLoading(false);
      Swal.fire("Success", "Machine updated successfully", "success").then(() => {
        window.location.href = "/m_machine"; // Redirect to machine list page after successful update
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire("Error", "Failed to update machine", "error");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-wight-green">
      <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col px-12 py-12 justify-center " style={{ zIndex: 900 }}>
        <h1>Update Machine</h1>
        <form onSubmit={updateMachine} className=" px-12 py-30s justify-center">
  <div className="mb-5">
    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
      Name
    </label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
      required
    />
  </div>
  <div className="mb-5">
    <label htmlFor="cost" className="mb-3 block text-base font-medium text-[#07074D]">
      Cost
    </label>
    <input
      type="text"
      value={cost}
      onChange={(e) => setCost(e.target.value)}
      className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
      required
    />
  </div>
  <div className="mb-5">
    <label htmlFor="parts" className="mb-3 block text-base font-medium text-[#07074D]">
      Parts
    </label>
    <input
      type="text"
      value={parts}
      onChange={(e) => setParts(e.target.value)}
      className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
      required
    />
  </div>
  <div className="mb-5">
    <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
      Description
    </label>
    <input
      type="text"
      value={discription}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
      required
    />
  </div>
  <div className="mb-5">
                  <label htmlFor="location" className="mb-3 block text-base font-medium text-[#07074D]">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white focus:outline-whatsapp-green py-3 px-6 text-base font-medium text-[#6B7280]"
                    required
                  />
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
      )}
    </div>
  );
};

export default MachineUpdate;
