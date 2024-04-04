import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Products = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
 




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customeritems/getallitems");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (item) => {
    try {
      
      await axios.post("http://localhost:5000/api/shoppingCart/addToCart", {
        name: item.name,
        _id: item._id,
        price: item.price,
        userid: "user123",
        quantity: 1,
        imageurl: item.imageurl
      });
  
      navigate('/ShoppingCart');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error adding item to cart:", error.response.data.error);
      } else {
        console.error("Error adding item to cart:", error.message);
      }
      alert("Failed to add item to cart."); // Show a user-friendly error message
    }
  };
  
  



  return (
    <div>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="w-full bg-white border border-green-800 p-12 flex flex-col justify-center items-center">
              <div className="mb-8">
                <img className="object-center object-cover rh-100 w-100" src={item.imageurl[0]} alt="photo" />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">{item.name}</p>
                <p className="text-base text-gray-400 font-normal">
                  {item.price ? `Rs.${item.price.toFixed(2)} / ${item.quantity}kg` : 'Price not available'}
                </p>

              </div>
              <div className="mt-4 d-flex justify-content-center ">
                <div className="mt-4 d-flex justify-content-center  border-emerald-600">
                  <button className="btn btn-outline-success rounded bg-green-600 text-tablerow-hover  px-10 py-2 hover:bg-black"
                    onClick={() => addToCart(item)}>Add to cart</button>
                </div>
                <div className="mt-4 d-flex justify-content-center border-emerald-600">
                  <Button className="btn btn-outline-success rounded bg-red-600 text-tablerow-hover  px-6 py-2 hover:bg-black"
                 >Schedule Order</Button>
                </div>
              </div>

            </div>
          ))}

            

        </div>
      </section>


    </div>
  );
};

export default Products;
