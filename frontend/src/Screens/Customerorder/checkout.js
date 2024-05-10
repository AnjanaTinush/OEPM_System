import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';


function ShippingDetailsForm() {
 
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalcode] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);


  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/shoppingCart/getitem');
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('Error fetching cart items: ', error);
    }
  };


  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += (item.price * item.quantity);
    });
    setTotalPrice(totalPrice);
  };


  // Event handler for first name input
  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setFirstName(input);
    }
  };


  // Event handler for last name input
  const handleLastNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setLastName(input);
    }
  };


  // Event handler for phone number input
  const handlePhoneChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, '');
    input = input.slice(0, 10);
    setPhoneNumber(input);
  };

  


  const createOrder = async () => {
    try {
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        streetAddress,
        city,
        district,
        postalCode,
      };
  
      const deliveryData = {
        customerName: `${firstName} ${lastName}`,
        customerPhone: phoneNumber,
        deliveryAddress: `${streetAddress}, ${city}, ${district}`,
      };
  
      await axios.post('http://localhost:5000/api/orderdetails/create', data);
      await axios.post('http://localhost:5000/api/deliveries/newdelivery', deliveryData);
      // Remaining code
    } catch (error) {
      console.error('Error creating order: ', error);
    }
  };
  
  // Function to generate PDF report
  const generateReport = (firstName, lastName, phoneNumber, totalPrice, cartItems) => {
    const doc = new jsPDF();

    let y = 20; // Initial Y position

    // Header
    doc.setFontSize(16);
    doc.text('Order Summary', 105, y, { align: 'center' });
    y += 10; // Increase Y position

    // Customer information
    doc.setFontSize(12);
    doc.text(`Name: ${firstName} ${lastName}`, 20, y);
    doc.text(`Phone Number: ${phoneNumber}`, 20, y + 10);
    y += 20; // Increase Y position

    // Order items
    doc.setFontSize(14);
    cartItems.forEach(item => {
      doc.text(`${item.itemName}: Qty ${item.quantity} - Rs.${item.price.toFixed(2)}`, 20, y);
      y += 10; // Increase Y position
    });

    // Total price
    doc.setFontSize(16);
    doc.text(`Total Price: Rs.${totalPrice.toFixed(2)}`, 20, y + 10);

    // Save PDF
    doc.save('order_summary.pdf');
  };


  return (
    <div className="checkoutScreen  ">
      <div className="checkoutScreen flex justify-start ml-16 mt-20 ">
        <div className='screen__left border border-green-500 px-10 '>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="border-b border-gray-900/10 pt-10 pb-12">
                  <h2 className="font-bold leading-7 text-gray-900 text-xl  ">Shipping Information</h2>
                  <hr style={{ border: '1px solid ', margin: '10px 0' }} />
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                      <div className="mt-2">
                        <input type="text" name="first-name" id="first-name" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 " />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                      <div className="mt-2">
                        <input type="text" name="last-name" id="last-name" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                      <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setemail(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Contact Number</label>
                      <div className="mt-2">
                        <input id="phone" name="phone" type="tel" autoComplete="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                      <div className="mt-2">
                        <input type="text" name="street-address" id="street-address" autoComplete="street-address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                      <div className="mt-2">
                        <input type="text" name="city" id="city" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">District</label>
                      <div className="mt-2">
                        <input type="text" name="region" id="region" autoComplete="address-level1" value={district} onChange={(e) => setDistrict(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                      <div className="mt-2">
                        <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" value={postalCode} onChange={(e) => setPostalcode(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
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
          {/* Other order summary details */}
          <div className="mt-4 d-flex justify-content-center mb-2 border-emerald-600"><button type='submit' onClick={createOrder}>
            <Link to="/payment" className="btn btn-outline-success rounded bg-green-600 text-tablerow-hover ml-20  px-20 py-2 hover:bg-black" 
          
          // Redirect to payment page or show confirmation message
      >CHECKOUT</Link></button>
          </div>
        </div>

      </div>
      <div className="flex items-center justify-center mt-10">
        <button type="submit" className="rounded-md bg-red-600 px-12 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          onClick={() => generateReport(firstName, lastName, phoneNumber, totalPrice, cartItems)} >
          Download Invoice
        </button>
      </div>

    </div>
  );
}

export default ShippingDetailsForm;
