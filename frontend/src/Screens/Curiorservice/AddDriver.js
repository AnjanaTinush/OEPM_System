import axios from "axios";
import React, { useState } from "react";

function AddDriver() {
  // define variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicalnum, setVehicalnum] = useState("");
  const [availability, setAvailability] = useState("");

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check any field is empty
    if (!name || !email || !phone || !vehicalnum || !availability) {
      alert("Please fill in all fields");
      return;
    }

    // Create object with form data
    const driver = { name, email, phone, vehicalnum, availability };
    console.log(driver);
    
    try {
      // add driver post request
      const result = await axios.post(
        "http://localhost:5000/api/drivers/j_drivers",
        driver
      );
      console.log(result.data);
      alert("Driver added successfully");
      window.location.href = "/j_drivers";
    } catch (error) {
      console.log(error);
    }
  };

  //phone number validation
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // remove non-numeric values
    setPhone(input);
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 50,
      }}
      className="flex justify-center items-center h-screen "
    >
      <div className="w-96 rounded-lg shadow-lg bg-white p-8 ">
        <form onSubmit={handleSubmit}>
          {/* input name */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-dark font-custom text-center">
              Enter New Driver Details
            </h2>
            <input
              type="text"
              placeholder="Name"
              required
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* input email */}
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

          {/* input phone number */}
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone Number"
              required
              maxLength="10"
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          {/* input vehical number*/}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Vehicle Number"
              required
              className="mt-1 p-2 block w-full rounded-3xl bg-wight-green border-none focus:outline-whatsapp-green placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
              value={vehicalnum}
              onChange={(e) => setVehicalnum(e.target.value)}
            />
          </div>

          {/*availability*/}
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

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="text-white bg-dark hover:bg-darkhover block w-full focus:outline-none  font-semibold rounded-md font-custom text-md px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-darkhover"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDriver;
