import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";

function Feedback() {
  const [fdrname, setFdrname] = useState("");
  const [frating, setFrating] = useState("");
  const [fcomment, setFcomment] = useState("");
  const [driverNames, setDriverNames] = useState([]); // State to store driver names

  // Store all feedbacks
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDriverNames(); // Fetch driver names when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/driverfeedback/getallfeedbacks");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Fetch driver names from database
  const fetchDriverNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/drivers/getalldrivers");
      // Extract driver names from the response
      const names = response.data.map((driver) => driver.name);
      setDriverNames(names);
    } catch (error) {
      console.error("Error fetching driver names:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedback = { fdrname, frating, fcomment };
      const result = await axios.post(
        "http://localhost:5000/api/driverfeedback/newfeedback",
        feedback
      );
      window.location.reload();
      alert("Feedback submitted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
      backgroundSize: 'cover',
      minHeight: '100vh'
    }}>
      <AdminNavbar />
      <Navbar />
      <div className="container mx-auto mt-10 p-7">
        <h2 className="text-xl font-bold mb-4">Feedback Form For Courier Service</h2>
        <form className="max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="driver-name" className="block font-bold mb-1">
              Driver's Name:
            </label>
            {/* Dropdown menu for selecting driver names */}
            <select
              id="driver-name"
              value={fdrname}
              onChange={(e) => setFdrname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Driver</option>
              {/* Map over driver names and create option for each */}
              {driverNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block font-bold mb-1">
              Rating:
            </label>
            {/* Rating input */}
            <select
              id="rating"
              value={frating}
              onChange={(e) => setFrating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block font-bold mb-1">
              Comments:
            </label>
            {/* Comment textarea */}
            <textarea
              id="comment"
              placeholder="Enter your comments"
              value={fcomment}
              onChange={(e) => setFcomment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
      {/* Displaying feedbacks */}
      <h1 className="flex justify-center text-5xl font-semibold ml-44 p-8 font-serif text-green-800">
        Driver Feedback
      </h1>
      <div className="flex justify-center items-center">
        <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
          <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Feedback ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr
                  key={feedback._id}
                  className="bg-white dark:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover"
                >
                  <td className="px-6 py-4 font-medium text-green-900">
                    {feedback._id}
                  </td>
                  <td className="px-6 py-4 font-medium text-green-900">
                    {feedback.fdrname}
                  </td>
                  <td className="px-6 py-4 font-medium text-green-900">
                    {feedback.frating}
                  </td>
                  <td className="px-6 py-4 font-medium text-green-900">
                    {feedback.fcomment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
