import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import Navbar from "../../Component/Navbar";

const Pay = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/payment/createPayment", formData);
      console.log(response.data);
      toast.success("Payment received successfully!");
      setShowModal(true); // Show modal on successful payment
    } catch (error) {
      console.error("Error:", error);
      toast.error("Payment failed!");
    }
  };

  const closeModal = () => {
    setShowModal(false); // Function to close modal
  };

  // Function to generate PDF report
  const generateReport = (
    firstName,
    lastName,
    phoneNumber,
    totalPrice,
    cartItems
  ) => {
    const doc = new jsPDF();

    let y = 20; // Initial Y position

    // Header
    doc.setFontSize(16);
    doc.text("Order Summary", 105, y, { align: "center" });
    y += 10; // Increase Y position

    // Customer information
    doc.setFontSize(12);
    doc.text(`Name: ${firstName} ${lastName}`, 20, y);
    doc.text(`Phone Number: ${phoneNumber}`, 20, y + 10);
    y += 20; // Increase Y position

    // Order items
    doc.setFontSize(14);
    cartItems.forEach((item) => {
      doc.text(
        `${item.itemName}: Qty ${item.quantity} - Rs.${item.price.toFixed(2)}`,
        20,
        y
      );
      y += 10; // Increase Y position
    });

    // Total price
    doc.setFontSize(16);
    doc.text(`Total Price: Rs.${totalPrice.toFixed(2)}`, 20, y + 10);

    // Save PDF
    doc.save("order_summary.pdf");
  };

  return (
    <div>
    <Navbar />
    <div className="full mt-20">
      <form onSubmit={handleSubmit}>
        <div className="container border border-green-500 px-30 mt-10 py-30 width-500">
          <div className="space-y-10 px-10 py-10 mb-10">
            {/* Card Holder's Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="cardHolderName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Card Holder's Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="cardHolderName"
                  id="cardHolderName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Card Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Card Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="sm:col-span-1">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Expiry Date
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* CVV */}
            <div className="sm:col-span-1">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CVV
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Pay Button */}
            <div className="mt-6 flex items-center justify-center">
              <button
                type="submit"
                className="rounded-md bg-red-600 px-12 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Modal content */}
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Payment Successful
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your payment has been received successfully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-12 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                  onClick={() =>
                    generateReport(
                      firstName,
                      lastName,
                      phoneNumber,
                      totalPrice,
                      cartItems
                    )
                  }
                >
                  Download Invoice
                </button>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Pay;
