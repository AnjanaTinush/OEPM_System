import React from 'react'
import AdprofileNavbar from './Component/AdprofileNavbar'
import Navbar from '../Component/Navbar'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


function Requestedleave() {
  return (
    <div>
        <Navbar/>
        <AdprofileNavbar/>

        <div class="max-w-2xl bg-white border border-gray-200 rounded-lg px-2 mx-auto mt-16 mr-60">
    <form class="flex items-center w-full">
        <RangePicker />

        <input type="text" class="w-1/3 border rounded py-2 px-3 mb-3 mt-2 mr-4 ml-4" placeholder="Enter your reason" />

        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow">
            send request
        </button>
    </form>
</div>



    </div>
  )
}

export default Requestedleave