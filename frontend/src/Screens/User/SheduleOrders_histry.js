import React from 'react'

function SheduleOrders_histry() {
  return (
    <div>
      <h1 className="flex justify-center ml-10 text-4xl italic  text-green-900">
            Employee leave Request
          </h1>
          <div className="flex justify-center items-center h-full mt-3">
            <div className="overflow-x-auto shadow-2xl sm:rounded-lg ml-16">
              <table
                data-aos="zoom out"
                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      User name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      From Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      To Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Reason
                    </th>

                    <th scope="col" className="px-6 py-3 text-center">
                      Manage
                    </th>
                  </tr>
                </thead>
                <tbody>
                 
                      <tr
                       
                        className="bg-white dark:bg-table-row  hover:tablerow-hover dark:hover:bg-tablerow-hover"
                      >
                        <td className="px-6 py-4 font-medium text-green-900 text-center">
                       s
                        </td>
                        <td className="px-6 py-4 text-green-900 text-center">
                        d
                        </td>
                        <td className="px-6 py-4 text-green-900 text-center">
                          e
                        </td>
                        <td className="px-6 py-4 text-green-900 text-center ">
                         f
                        </td>

                        <td className="px-6 py-4 text-green-900 text-center ">
                          t
                        </td>
                      </tr>
                   
                </tbody>
              </table>
            </div>
          </div>
    </div>
  )
}

export default SheduleOrders_histry