import React, { useEffect, useState, } from "react";
import axios from "axios";

import { StyleSheet, pdf, Font, Page, Text, View, Document } from '@react-pdf/renderer';
import Adminnavbar from './Component/Adminnavbar'


export function MachinePdf(){

    const [machine, setMachine] = React.useState([]);
    const [duplicateusers, setduplicateusers] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
          setLoading(true)
          const data = await axios.get(
            "http://localhost:5000/api/machines/getallmachines"
          );
          setMachine(data.data);
          setduplicateusers(data.data); // Update duplicateusers with fetched data
          setLoading(false)
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);


    const generatePDF = () => {
      Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/roboto/22.0.2/fonts/Roboto/roboto-regular.ttf' });

      const styles = StyleSheet.create({
        page: {
          padding: 30,
        },
        section: {
          marginBottom: 10,
        },
        table: {
          display: 'table',
          width: '100%',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#000',
          marginBottom: 10,
        },
        tableRow: {
          flexDirection: 'row',
        },
        tableCell: {
          flex: 1,
          padding: 5,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#000',
        },
        tableHeader: {
          backgroundColor: '#f0f0f0',
        },
      });

      const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Machine List</Text>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell]}>Name</Text>
                <Text style={[styles.tableCell]}>Cost of the Machine</Text>
                <Text style={[styles.tableCell]}>Machine Parts</Text>
                <Text style={[styles.tableCell]}>Machine Description</Text>
              </View>
              {machine.map((machine, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{machine.name}</Text>
                  <Text style={styles.tableCell}>{machine.cost.join(', ')}</Text>
                  <Text style={styles.tableCell}>{machine.parts.join(', ')}</Text>
                  <Text style={styles.tableCell}>{machine.discription}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      );

      pdf(MyDocument).toBlob().then((blob) => {
        // Download the generated PDF
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'machines.pdf');
        document.body.appendChild(link);
        link.click();
      });
    };

    return (
      <div className="bg -">
        <div className="flex">
    {/* Side Navigation */}
    <Adminnavbar />

        

<table
  data-aos="zoom out"
  className="w-5/6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-4 "
>
  <thead className="text-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-greentext-xs text-whatsapp-green uppercase bg-wight-green dark:bg-whatsapp-green dark:text-wight-green">
    <tr>
      <th scope="col" className="px-6 py-3 text-center">
        Name
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Cost of the Machine
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Machine Parts
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Machine Details
      </th>
    </tr>
  </thead>
  <tbody>
    {machine.length > 0 ? (
      machine.map((machine, index) => (
        <tr
          key={index}
          className="bg-green-50 green:bg-table-row hover:tablerow-hover dark:hover:bg-tablerow-hover px-6 py-3"
        >
          <td className="px-6 py-4 text-green-900 left-0">{machine.name}</td>
          <td className="px-6 py-4 text-green-900 left-0">{machine.cost.join(', ')}</td>
          <td className="px-6 py-4 text-green-900 left-0">{machine.parts.join(', ')}</td>
          <td className="px-6 py-4 text-green-900 left-0">{machine.discription}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="text-center py-4 text-red-500">
          Machines not found.
        </td>
      </tr>
    )}
  </tbody>
</table>

        <div className="flex items-center justify-end h-full mr-20">
          <button
            onClick={generatePDF}
            className="text-white bg-whatsapp-green hover:bg-Buttongreen focus:outline-none focus:ring-4 focus:ring-Buttongreen font-medium rounded-full text-me px-5 py-2.5 text-center me-2 mb-2 dark:whatsapp-green dark:hover:bg-Buttongreen dark:focus:ring-Buttongreen font-sans shadow-xl max-w-md mx-auto"
          >
            Generate PDF
          </button>
        </div>
      </div>
      </div>
    );
}
