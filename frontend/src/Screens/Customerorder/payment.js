import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pay = () => {


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

        </div>



    );
}

export default Pay;
