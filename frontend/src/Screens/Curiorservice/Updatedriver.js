import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Updatedriver() {
  const driverid = useParams().id;

  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicalnum, setVehicalnum] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    async function getdriver() {
      try {
        console.log(driverid);

        const response = await axios.get(
          `http://localhost:5000/api/drivers/getdriver/${driverid}`
        );

        console.log(response.data.user);
        const res = response.data.user;

        setName(res.name);
        setEmail(res.email);
        setPhone(res.phone);
        setVehicalnum(res.vehicalnum);
        setAvailability(res.availability);
      } catch (error) {
        console.log(error);
      }
    }
    getdriver();
  }, [driverid]);

  // Function to handle phone number input
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 10); // Remove non-numeric characters and limit to 10 digits
    setPhone(input);
  };

  // Function to handle form submission
  async function Updatedriver(e) {
    e.preventDefault();

    const updatedriver = {
      name,
      email,
      phone,
      vehicalnum,
      availability,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/drivers/updatedriver/${driverid}`,
        updatedriver
      );

      console.log(response);

      window.location.href = "/j_drivers";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
    
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
      backgroundSize: "cover",
    }}

    >
      

      <div className="flex justify-center items-center h-screen">
        <div className="w-96 rounded-lg shadow-lg bg-white p-8">
          <form onSubmit={Updatedriver}>
            {" "}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-dark font-custom text-center mb-4">
                Enter the Driver Details
              </h2>
              <input
                type="text"
                placeholder="Name"
                className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                required
                className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]*"
                maxLength="10"
                className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Vehicle Number"
                className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={vehicalnum}
                onChange={(e) => setVehicalnum(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <select
                className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Select Availability</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-darkhover"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updatedriver;
