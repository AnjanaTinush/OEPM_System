import React, { useState } from "react";
import Flexbox from "flexbox-react";

function Driverprofile() {
  const [orderStatus, setOrderStatus] = useState("");
  const [availability, setAvailability] = useState("available");

  const handleUpdateStatus = () => {
    // Update the order status logic here
    alert(`Order status updated to ${orderStatus}`);
  };

  const handleUpdateAvailability = () => {
    // Update the availability logic here
    alert(`Availability updated to ${availability}`);
  };

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
        Driver Profile
      </h1>

      <Flexbox className="flex justify-evenly grow p-5 gap-2 ">
            <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Total Deliveries
              <br />
              <br />
              50
              
            </Flexbox>
            <Flexbox className=" p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Total Deliveries  This Month
              <br />
              <br />
              20
            </Flexbox>

            <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Delivered
              <br />
              <br />
              5
            </Flexbox>

            <Flexbox className="p-5 border-solid border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              Rating
              <br />
              <br />
              5/5
            </Flexbox>
          </Flexbox>

      <div>
        <div className="flex gap-8">
          <div className="flex gap-8 grow flex-col">
          
            {/* Personal Information */}
            <div className="p-6 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              <h2 className="text-2xl font-semibold mb-6">
                Personal Information
              </h2>
              <p className="text-lg mb-4">
                <strong>Name:</strong> Janith Wijethunga
              </p>
              <p className="text-lg mb-4">
                <strong>Email:</strong> janith@gmail.com
              </p>
              <p className="text-lg mb-4">
                <strong>Phone Number:</strong> 04500256699
              </p>
              <p className="text-lg mb-4">
                <strong>Vehicle Number:</strong> 123456
              </p>
              <p className="text-lg mb-4">
                <strong>Availability:</strong> {availability}
              </p>
            </div>

            {/* Update Availability */}
            <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Update Availability
              </h2>
              <select
                className="border p-2 mb-4"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdateAvailability}
              >
                Update Availability
              </button>
            </div>
            </div>

          {/* Driver Statistics and Update Sections */}
          <div className="flex gap-4 flex-col ">
            <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              <h2 className="text-xl font-semibold mb-4">Driver Statistics</h2>
              <p>
                <strong>Total Deliveries:</strong> 20
              </p>
              <p>
                <strong>Average Rating:</strong> 4.5
              </p>
              <p>
                <strong>Last Active:</strong> 2024-04-10 14:30
              </p>
            </div>

            {/* Delivery History */}
            <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              <h2 className="text-xl font-semibold mb-4">Delivery History</h2>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Delivery ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Pickup Address
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Delivery Address
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">D001</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Delivered
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      123 Street, City
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      456 Road, Town
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      2024-04-10
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>

            {/* Feedback and Ratings */}
            <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Feedback and Ratings
              </h2>
              <div className="space-y-4">
                <div>
                  <strong>Delivery ID:</strong> D001
                  <br />
                  <strong>Rating:</strong> 4.5
                  <br />
                  <strong>Feedback:</strong> Excellent service!
                </div>
                {/* Add more feedback items as needed */}
              </div>
            </div>

            {/* Update Order Status */}
            <div className="p-4 border-2 border-whatsapp-green rounded-lg shadow-2xl bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Update Order Status
              </h2>
              <input
                type="text"
                placeholder="Enter Order Status"
                className="border p-2 mb-4"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdateStatus}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Driverprofile;
