import React, { useState, useEffect } from "react";
import axios from "axios";
import Flexbox from "flexbox-react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineStarRate } from "react-icons/md";

function Driverprofile() {
  const driver = JSON.parse(localStorage.getItem("currentdriver"));
  const [availability, setAvailability] = useState("available");
  const [deliveryStatus, setDeliveryStatus] = useState("deliveryStatus");
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    async function fetchDelivery() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/deliveries/getdelivery/${driver.data.name}`
        );
        setDelivery(response.data.delivery);
      } catch (error) {
        console.error("Error fetching delivery:", error);
      }
    }

    fetchDelivery();
  }, [driver]);

  async function Updatedriver(e) {
    e.preventDefault();

    const updatedriver = {
      availability,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/drivers/updatedriver/${driver.data._id}`,
        updatedriver
      );

      console.log(response);

      const updatedDriver = {
        ...driver,
        data: { ...driver.data, availability },
      };
      localStorage.setItem("currentdriver", JSON.stringify(updatedDriver));

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }




  async function Updatestatus(e) {
    e.preventDefault();

    const updatestatus = {
      deliveryStatus,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/deliveries/updatedeliverystatus/${delivery.driverName}`,
        updatestatus
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating delivery status:", error);
      // Handle error response
    }
  }






  
  

  return (
    <div
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
        backgroundSize: "cover",
      }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans"
    >
      <div className=" bg-white p-8">
        <h1 className="text-center text-5xl font-semibold p-8 font-serif text-green-800">
          Hi {driver.data.name}, Welcome to your Profile page
        </h1>

        <Flexbox className="flex justify-evenly grow p-5 gap-auto ">
          <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
            Total Deliveries
            <br />
            <br />
            50
            <TbTruckDelivery className="w-20 h-20 ml-12 opacity-70 " />
          </Flexbox>

          <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
            Average Rating
            <br />
            <br />
            5/5
            <MdOutlineStarRate className="w-20 h-20 ml-12 opacity-70 " />
          </Flexbox>
        </Flexbox>

        <div>
          <div className="flex gap-8">
            <div className="flex gap-8 grow flex-col">
              <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
                <h2 className="text-2xl font-semibold  text-center">
                  Personal Information
                </h2>
                <p className="text-lg mb-4">
                  <strong>Name:</strong> {driver.data.name}
                </p>
                <p className="text-lg mb-4">
                  <strong>Email:</strong> {driver.data.email}
                </p>
                <p className="text-lg mb-4">
                  <strong>Phone Number:</strong> {driver.data.phone}
                </p>
                <p className="text-lg mb-4">
                  <strong>Vehicle Number:</strong> {driver.data.vehicalnum}
                </p>
                <p className="text-lg mb-4">
                  <strong className="text-lg mb-4 ">Availability:</strong>{" "}
                  {driver.data.availability}
                </p>
                <div className="p-4  bg-white">
                  <h2 className="text-xl font-semibold mb-4">
                    Update Availability
                  </h2>
                  <select
                    className="border p-2 mb-4 rounded-lg border-black"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option>Select Availability</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
                    onClick={Updatedriver}
                  >
                    Update Availability
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col ">
              <div className="p-4 border-2 size-full border-whatsapp-green rounded-lg shadow-2xl bg-green-100 ">
                <h1 className="text-xl text-center font-semibold mb-4">
                  Ongoing Delivery
                </h1>
                {delivery && (
                  <>
                    <p className="text-lg mb-4">
                      <strong>OrderID-</strong> {delivery._id}
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Tracking Code-</strong> {delivery.trackingCode}
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Customer Name-</strong> {delivery.customerName}
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Phone Number-</strong> {delivery.customerPhone}
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Address-</strong> {delivery.deliveryAddress}
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Status-</strong> {delivery.deliveryStatus}
                    </p>
                    <div className="p-4  bg-green-100 mt-2">
                      <h2 className="text-xl font-semibold mb-4">
                        Update Delivery Status
                      </h2>
                      <select
                        className="border p-2 mb-4 rounded-lg border-black"
                        
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                      >
                        <option>Select Delivery Status</option>
                        <option value="Processing">Processing</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Out Of Delivery">Out Of Delivery</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
                        onClick={Updatestatus}
                      >
                        Update Status
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driverprofile;
