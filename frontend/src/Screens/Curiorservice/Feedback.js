import React from 'react'
import AdminNavbar from "./Component/Adminnavbar";
import Navbar from "./Component/Navbar";


function Feedback() {
  return (
    
    <div
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/020/645/443/small_2x/light-green-yellow-white-gradient-background-smooth-noise-texture-blurry-backdrop-design-copy-space-photo.jpg')`,
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
    }}
  >
  <AdminNavbar/>
  <Navbar/>

  <h1 className="flex justify-center text-5xl font-semibold ml-44 p-8 font-serif text-green-800">Driver Feedback</h1>

  <div className="flex justify-center items-center h-full">
          <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-60">
            
              <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Feedback ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Driver Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Comment
                    </th>
                  </tr>
                </thead>
                
              </table>
            </div>
          </div>
        </div>
  )
}

export default Feedback
