// payment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pay = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/shoppingCart');
            setCartItems(response.data);
            calculateTotalPrice(response.data);
        } catch (error) {
            console.error('Error fetching cart items: ', error);
        }
    };

    const calculateTotalPrice = (items) => {
        let totalPrice = 0;
        items.forEach(item => {
            totalPrice += (item.price * item.quantity);
        });
        setTotalPrice(totalPrice);
    };

    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(`/api/shoppingCart/${id}`, { quantity: quantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity: ', error);
        }
    };

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

    const incrementQuantity = (id, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        handleQuantityChange(id, newQuantity);
        updateQuantity(id, newQuantity);
    };

    const decrementQuantity = (id, currentQuantity) => {
        const newQuantity = Math.max(1, currentQuantity - 1);
        handleQuantityChange(id, newQuantity);
        updateQuantity(id, newQuantity);
    };
   

    return (
        <div className='full mt-20'>
            <form >
                <div className='container border border-green-500 px-30 mt-10 py-30 width-500'>
                    <div className="space-y-10 px-10 py-10 mb-10">
                        {/* 1 - Card Holder's Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="cardHolderName" className="block text-sm font-medium leading-6 text-gray-900">Card Holder's Name</label>
                            <div className="mt-2">
                                <input type="text" name="cardHolderName" id="cardHolderName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        {/* 2 - Card Number */}
                        <div className="sm:col-span-2">
                            <label htmlFor="cardNumber" className="block text-sm font-medium leading-6 text-gray-900">Card Number</label>
                            <div className="mt-2">
                                <input type="text" name="cardNumber" id="cardNumber" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        {/* 3 - Expiry Date */}
                        <div className="sm:col-span-1">
                            <label htmlFor="expiryDate" className="block text-sm font-medium leading-6 text-gray-900">Expiry Date</label>
                            <div className="mt-2">
                                <input type="text" name="expiryDate" id="expiryDate" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        {/* 4 - CVV */}
                        <div className="sm:col-span-1">
                            <label htmlFor="cvv" className="block text-sm font-medium leading-6 text-gray-900">CVV</label>
                            <div className="mt-2">
                                <input type="text" name="cvv" id="cvv" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        {/* Pay Button */}
                        <div className="mt-6 flex items-center justify-center">
                            <button type="submit" className="rounded-md bg-red-600 px-12 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Pay Now</button>
                        </div>
                    </div>
                </div>
            </form>

            <h1 className='heading mt-20 ml-20 text-2xl  '>Scheduled Orders</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
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
                                        <button onClick={() => decrementQuantity(item._id, item.quantity)} className="bg-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-400 rounded-l px-2 py-1">
                                            -
                                        </button>
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))} 
                                            className="focus:outline-none text-center w-16 bg-gray-200 px-2 py-1" 
                                        />
                                        <button onClick={() => incrementQuantity(item._id, item.quantity)} className="bg-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-400 rounded-r px-2 py-1">
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
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

       

    );
}

export default Pay;
