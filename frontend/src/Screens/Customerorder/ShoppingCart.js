import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Component/Navbar';
import { Link } from 'react-router-dom';

const Cart = () => {
    // State variables to hold cart items and total price
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    // Fetch cart items when component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);


    // Function to fetch cart items from the server
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/shoppingCart/getitem');
            setCartItems(response.data);
            calculateTotalPrice(response.data);
        } catch (error) {
            console.error('Error fetching cart items: ', error);
        }
    };


    // Function to remove item from cart
    const removeFromCart = async (id) => {
        try {
            await axios.delete(`/api/shoppingCart/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item from cart: ', error);
        }
    };


    // Function to calculate total price of cart items
    const calculateTotalPrice = (items) => {
        let totalPrice = 0;
        items.forEach(item => {
            totalPrice += (item.price * item.quantity);
        });
        setTotalPrice(totalPrice);
    };


    // Function to update quantity of an item in cart
    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(`/api/shoppingCart/${id}`, { quantity: quantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity: ', error);
        }
    };


    // Handler function for quantity change
    const handleQuantityChange = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
    };


    // Function to increment quantity of an item in cart
    const incrementQuantity = (id, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        handleQuantityChange(id, newQuantity);
        updateQuantity(id, newQuantity);
    };


     // Function to decrement quantity of an item in cart
    const decrementQuantity = (id, currentQuantity) => {
        const newQuantity = Math.max(1, currentQuantity - 1);
        handleQuantityChange(id, newQuantity);
        updateQuantity(id, newQuantity);
    };


    // Function to update cart item
    async function Updatecart(itemid, quantity, totalprice) {
        const updatecart = {
            quantity,
            totalprice,
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/shoppingCart/updatecart/${itemid}`, updatecart);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    
    return (
        <div className="h-screen bg-gray-100 ">
            <div>
                <Navbar />
            </div>
            <div className="flex justify-between p-4">
                <div>
                    <h1 className="mb-3  text-2xl pt-4">Shopping Cart ({cartItems.length} items) </h1>
                </div>
                <div className="flex items-center">
                    <h1 className="mb-3 text-left text-2xl font-bold pt-4 mt-1 mr-10">Total : Rs.{totalPrice.toFixed(2)} </h1>
                    <Link to="/checkout" className="btn bg-red-600  text-white mt-3 px-4 py-2 mr-4 " type="button">GO TO CHECKOUT</Link>
                    <h4> or </h4>
                    <Link to="/c_displayitem" className="btn bg-black text-white mt-3 px-4 py-2 ml-4 mr-4" type="button">SHOP MORE</Link>
                </div>
            </div>
            <div className="border-b-2 mb-10 border-blue-900 ..."></div>
            <div
            style={{ width: "100%", paddingLeft: "10rem", paddingRight: "10rem" }}
          >
            <table className="w-full text-sm text-center  rtl:text-right text-gray-500 dark:text-gray-400  rounded-xl overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-green-900 dark:text-white">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty (kg)
                </th>
                <th scope="col" className="px-6 py-3">
                    Unit Price ( 1Kg)
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {cartItems.map(item => (
                <tr key={item._id} className="bg-white border-b dark:bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200">
                    <td className="p-4">
                        <img src={item.imageurl} className="w-16 md:w-32 max-w-full max-h-full" alt="Item" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-100 dark:text-black">
                        {item.itemName}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <button onClick={() => {
                                decrementQuantity(item._id, item.quantity);
                                Updatecart(item._id, item.quantity-1, item.price * item.quantity-(item.price));
                            }} className="bg-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-400 rounded-r px-2 py-1">
                                -
                            </button>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                className="focus:outline-none text-center w-16 bg-gray-200 px-2 py-1"
                            />
                            <button onClick={() => {
                                incrementQuantity(item._id, item.quantity);
                                Updatecart(item._id, item.quantity+1, item.price * item.quantity+(item.price));
                            }} className="bg-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-400 rounded-r px-2 py-1">
                                +
                            </button>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-grey">
                        {item.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-grey">
                        {item.price * item.quantity}
                    </td>
                    <td className="px-6 py-4">
                        <button onClick={() => removeFromCart(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline" type="button">Remove</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
        </div>
    );
};

export default Cart;
