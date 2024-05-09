import React, { useState, useEffect } from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from "../././Component/Navbar";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import axios from "axios";

function History() {
  const [historyItems, setHistoryItems] = useState([]);
  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-green-600 dark:text-wight-green">
          <tr>
            <th scope="col" className="px-6 py-3">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3">
              Action Type
            </th>
            <th scope="col" className="px-6 py-3">
              Changed Item
            </th>
          </tr>
        </thead>
        <tbody>
          {historyItems.map((item) => (
            <tr
              className="bg-white dark:hover:bg-tablerow-hover"
              key={item._id}
            >
              <td className="px-6 py-4 font-medium text-green-900">
                {item.timestamp}
              </td>
              <td className="px-6 py-4 font-medium text-green-900">
                {item.actionType}
              </td>
              <td className="px-6 py-4 font-medium text-green-900">
                {JSON.stringify(item.changedItem)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));
  const componentRef = React.useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory/getallhistory");
      setHistoryItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "HistoryData",
  });

  return (
    <div className="bg-wight-green h-screen flex flex-col">
      <Adminnavbar />
      <Navbar />
      <div className="flex justify-center h-full items-center flex-col">
        <ComponentToPrint ref={componentRef} />
        <div className="flex justify-center items-center mt-5">
          <button
            type="button"
            onClick={generatePDF}
            className="text-white mt-5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600/20 font-light rounded-full text-2xl px-6 py-4 text-center me-2 mb-2 dark:whatsapp-green font-sans shadow-md"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default History;
