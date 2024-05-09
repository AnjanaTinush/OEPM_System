import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import image1 from "../../Images/shop1.jpg";
import image2 from "../../Images/shop2.jpg";
import image3 from "../../Images/shop3.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Products = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customeritems/getallitems"
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 2 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const addToCart = async (item) => {
    try {
      await axios.post("http://localhost:5000/api/shoppingCart/addToCart", {
        name: item.name,
        _id: item._id,
        price: item.price,
        userid: "user123",
        quantity: 1,
        imageurl: item.imageurl,
      });

      navigate("/ShoppingCart");
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response || error.message
      );
      alert("Failed to add item to cart.");
    }
  };

  const handleScheduleOrderClick = (item) => {
    // Set the quantity property for the selected item
    const selectedItemWithQuantity = { ...item, quantity: 1 };
    setSelectedItem(selectedItemWithQuantity);
    setShowModal(true);
  };

  const handleQuantityChange = (change) => {
    setSelectedItem((prevItem) => {
      const newQuantity = prevItem.quantity + change;
      return { ...prevItem, quantity: Math.max(1, newQuantity) };
    });
  };

  const[userid,setuserid]=useState();
  const [itemName,setitemName]=useState();
  const [price,setprice]=useState()
  const [quantity,setquantity]=useState();
  const[date,setdate]=useState();



const scheduleOrder = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));

  const result={
    
      userid:currentUser._id, // Assuming you have a way to get the user ID
      itemName: selectedItem.name,
      price: selectedItem.price,
      quantity: selectedItem.quantity,
      date: selectedDate.toISOString() // Convert date to ISO string format
    
  }
  try {
    
    const response = await axios.post("http://localhost:5000/api/ScheduleOrder/newScheduleOrder", result);
    console.log("Order scheduled successfully:", response.data);
    setShowModal(false);
    alert("schedule order successfully ");
  } catch (error) {
    console.error("Error scheduling order:", error.response || error.message);
    alert("Failed to schedule order.");
  }
};

  
  



  return (
    <div>
      <div>
        <Navbar />
        <div className="bg-wight-green">
          {/* Slideshow */}
          <div className="flex justify-between p-10">
            <div className="overflow-hidden rounded-xl max-w-4xl">
              <img
                src={[image1, image2, image3][currentImageIndex]}
                alt="Slideshow"
                className="w-full rounded-lg"
              />
            </div>
            <div className="px-10 py-16">
              <p className="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">
                "Fresh, flavorful{" "}
              </p>
              <p className="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">
                vegetables
              </p>
              <p className="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">
                {" "}
                nurtured in our{" "}
              </p>
              <p className="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">
                {" "}
                Polytunnels{" "}
              </p>
              <p className="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">
                {" "}
                for your table."
              </p>
            </div>
          </div>

          {/* Search bar */}
          <h1 className="text-start ml-9 text-4xl font-custom font-bold text-black-green pb-6">
            {" "}
            Shop all the varieties of Veggies we have
          </h1>
          <div className="flex px-9 py-2">
            <div className="relative">
              <input
                className="form-input border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-2xl sm:rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                style={{ width: "400px" }}
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pb-2 text-lg">
                <AiOutlineSearch className="text-gray-400" />
              </div>
            </div>
            <button
              className="text-white ml-4 bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-4 py-2 text-center mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
              onClick={handleScheduleOrderClick}
            >
              Search
            </button>
            <div className="ml-auto">
              <a href="/shoppingcart">
                <button
                  className="text-white ml-4 bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4
                      focus:ring-Buttongreen font-medium rounded-full text-me px-4 py-2 text-center mb-2 dark:whatsapp-green
                      dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl transition-transform duration-300 
                      ease-in-out transform hover:scale-105"
                  style={{ width: "200px" }}
                >
                  View Cart
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pb-0 text-lg">
                    <MdOutlineShoppingCart className="text-white text-bold" />
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Grid of products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8  bg-wight-green">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105  overflow-hidden flex flex-row h-60 "
            >
              <div className="flex flex-col justify-between p-5 w-1/2">
                <p className="text-2xl text-gray-700 font-bold font-custom mt-1 ">
                  {item.name}
                </p>
                <p className="text-xl text-gray-400 font-normal font-sans mb-2">
                  {item.price
                    ? `Rs.${item.price.toFixed(2)} / 1kg`
                    : "Price not available"}
                </p>
                <div className="flex gap-2">
                  <button
                    className="btn border ring-2 ring-whatsapp-green border-whatsapp-green px-2 py-1 transition-transform duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => addToCart(item)}
                  >
                    <MdOutlineShoppingCart className="text-whatsapp-green" />
                  </button>
                  <button
                    className="btn border ring-2 ring-whatsapp-green border-whatsapp-green px-2 py-1 font-sans font-bold text-whatsapp-green transition-transform duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleScheduleOrderClick(item)}
                  >
                    Schedule Order
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center w-1/2 h-full">
                <img
                  className="object-center object-cover"
                  src={item.imageurl[0]}
                  alt="photo"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Schedule your order</h2>
              {/* Modal content */}
              {selectedItem && (
                <div>
                  <img
                    src={selectedItem.imageurl[0]}
                    alt={selectedItem.name}
                    className="w-full h-auto mb-4" // Set a fixed width and auto height
                    style={{ maxWidth: "300px", maxHeight: "300px" }} // Alternatively, you can use inline styles
                  />
                  <p className="mb-4  font-bold">Name: {selectedItem.name}</p>
                  <p className="mb-4 font-bold">
                    Price: Rs.{selectedItem.price}.00 / 1kg
                  </p>
                  <div className="flex items-center mt-4 mb-4">
                    <p className="mr-2 font-bold">Quantity:</p>
                    <button
                      className="btn border ring-0.5 ring-gray-300 border-gray-300 px-2 py-1 font-sans font-bold text-black transition-transform duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={selectedItem.quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value))
                      }
                      className="form-input border border-gray-300 rounded-lg px-2 py-1 ml-2"
                      style={{ width: "80px" }}
                    />

                    <button
                      className="btn border ring-0.5 ring--gray-300 border-gray-300 px-2 py-1 ml-1.5 font-sans font-bold text-black transition-transform duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <p className="mr-2 mb-4 font-bold">
                      Date :{/* Date picker */}
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-input border border-gray-300 rounded-lg px-2 py-1 ml-2"
                        style={{ width: "150px" }}
                      />
                    </p>
                  </div>
                  {/* Add other item details here */}
                </div>
              )}
              <div>
                <button
                  className="btn border ring-1 ring-red-500 border-red-500 px-8 py-1 ml-4 font-sans font-bold text-red-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {/* Add some margin to create a gap */}
                <button
                  className="btn border ring-1 ring-whatsapp-green border-whatsapp-green px-2 py-1 ml-8 font-sans font-bold text-whatsapp-green transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={scheduleOrder}

                >
                 Schedule Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
