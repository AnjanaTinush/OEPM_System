import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShippingDetailsForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setFirstName(input);
    }
  };

  const handleLastNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setLastName(input);
    }
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, '');
    input = input.slice(0, 10);
    setPhoneNumber(input);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/orderDetails', {
        firstName: firstName,
        lastName: lastName,
        email: 'user@example.com', // You can replace this with the actual email if you collect it in the form
        contactNumber: phoneNumber,
        streetAddress: '123 Street',
        city: 'City',
        district: 'District',
        postalCode: '12345',
        total: totalPrice,
        cartItems: cartItems
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error during checkout: ', error);
      // Handle error
    }
  };

  return (
    <div className="checkoutScreen flex justify-start ml-16 mt-20 ">
      <div className='screen__left border border-green-500 px-10 '>
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="border-b border-gray-900/10 pt-10 pb-12">
                <h2 className="text-base font-bold leading-7 text-gray-900 text-xl  ">Shipping Information</h2>
                <hr style={{ border: '1px solid ', margin: '10px 0' }} />
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div className="mt-2">
                      <input type="text" name="first-name" id="first-name" autoComplete="given-name" value={firstName} onChange={handleFirstNameChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 " />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                    <div className="mt-2">
                      <input type="text" name="last-name" id="last-name" autoComplete="family-name" value={lastName} onChange={handleLastNameChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                      <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Contact Number</label>
                    <div className="mt-2">
                      <input id="phone" name="phone" type="tel" autoComplete="tel" value={phoneNumber} onChange={handlePhoneChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                    <div className="mt-2">
                      <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                    <div className="mt-2">
                      <input type="text" name="city" id="city" autoComplete="address-level2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">District</label>
                    <div className="mt-2">
                      <input type="text" name="region" id="region" autoComplete="address-level1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                    <div className="mt-2">
                      <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='screen__right' style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', marginLeft: '150px', width: '500px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>Order Summary</h2>
        <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
        {cartItems.map(item => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.imageurl} alt={item.itemName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>{item.itemName}</p>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '5px' }}>Qty: {item.quantity}</p>
          </div>
        ))}
        <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Sub Total</p>
          <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Rs.{totalPrice.toFixed(2)}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 'italic', marginBottom: '5px' }}>Shipping </p>
          <p style={{ fontSize: '0.8rem', fontWeight: 'italic', marginBottom: '5px' }}>600.00</p>
        </div>
        <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '5px' }}>Total</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '5px' }}>Rs.{totalPrice + 600}.00</p>
        </div>
        <div className="mt-4 d-flex justify-content-center mb-2 border-emerald-600">
        <Link to="/payment" className="btn btn-outline-success rounded bg-green-600 text-tablerow-hover ml-20  px-20 py-2 hover:bg-black" onClick={handleCheckout}>CHECKOUT</Link>
        </div>
      </div>
    </div>
  );
}

export default ShippingDetailsForm;
