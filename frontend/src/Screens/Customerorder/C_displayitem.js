import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import image1 from "../../Images/shop1.jpg";
import image2 from "../../Images/shop2.jpg";
import image3 from "../../Images/shop3.jpg";



const Products = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      // Increment the current image index in a loop
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 2 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error adding item to cart:", error.response.data.error);
      } else {
        console.error("Error adding item to cart:", error.message);
      }
      alert("Failed to add item to cart."); 
    }
  };

  const handleSearchButtonClick = () => {
    console.log("Search button clicked");
  };

  const slideshowImages = [image1, image2, image3];

  return (
    <div>
      <div>
        <Navbar />
        <div className="bg-wight-green">
        <div className="flex justify-between p-10">
  <div className="overflow-hidden rounded-xl max-w-4xl">
    <img
      src={slideshowImages[currentImageIndex]}
      alt="Slideshow"
      className="w-full rounded-lg"
    />
  </div>
  <div className="px-10 py-16">
    <p class="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">"Fresh, flavorful </p>
    <p class="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6">vegetables</p>
    <p class="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6"> nurtured in our </p>
    <p class="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6"> Polytunnels </p>
    <p class="text-center text-5xl font-custom font-bold text-whatsapp-green pb-6"> for your table."</p>
  </div>
</div>
<h1 class="text-start ml-9 text-4xl font-custom font-bold text-black-green pb-6"> Shop all the varieties of Veggies we have</h1>
<div className="flex px-9 py-2">
  <div className="relative ">
    <input
      className="form-input border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-2xl sm:rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-whatsapp-green"  style={{ width: '400px' }}
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
    onClick={handleSearchButtonClick}
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
        style={{ width: '200px' }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8  bg-wight-green">
          {filteredItems.map((item, index) => (
            <div
            key={index}
            className="bg-white shadow-lg rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105  overflow-hidden flex flex-row h-60 "
          >
            <div className="flex flex-col justify-between p-5 w-1/2">
              <p className="text-2xl text-gray-700 font-bold font-custom mt-1 ">{item.name}</p>
              <p className="text-xl text-gray-400 font-normal font-sans mb-2">
                {item.price ? `Rs.${item.price.toFixed(2)} / ${item.quantity}kg` : 'Price not available'}
              </p>
              <div className="flex gap-2">
               
                <button className="btn border ring-2 ring-whatsapp-green border-whatsapp-green px-2 py-1 transition-transform duration-300 ease-in-out transform hover:scale-105" onClick={() => addToCart(item)}>
                  <MdOutlineShoppingCart className='text-whatsapp-green'/>
                </button>
                <button className="btn border ring-2 ring-whatsapp-green border-whatsapp-green px-2 py-1 font-sans font-bold text-whatsapp-green transition-transform duration-300 ease-in-out transform hover:scale-105">
                  Schedule Order
                </button>
                </div>
              
            </div>
            <div className="flex justify-center items-center w-1/2 h-full">
              <img className="object-center object-cover" src={item.imageurl[0]} alt="photo"  />
            </div>
          </div>
          
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;