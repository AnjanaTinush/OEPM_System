import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import Adminnavbar from "../Component/Adminnavbar";
import AddEMPSalary from "../Component/form/AddEmpSallary";
import { default as api } from "../../Financial/store/apiSlice";

function EMPSallary() {
  const { data, isFetching, isSuccess, isError } = api.useGetSallaryQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  // Function to handle changes in the search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    // Filter the data based on the search query
    if (data) {
      const filtered = data.filter((item) => {
        const empno = item?.empno?.toLowerCase() || "";
        const empname = item?.empname?.toLowerCase() || "";
        const department = item?.department?.toLowerCase() || "";
        const amount = String(item?.amount)?.toLowerCase() || "";
        const date = item?.date?.toLowerCase() || "";

        // Check if any of the properties contain the search query
        return (
          empno.includes(query) ||
          empname.includes(query) ||
          department.includes(query) ||
          amount.includes(query) ||
          date.includes(query)
        );
      });
      setFilteredData(filtered);
    }
  };

  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4">
        <View style={styles.page}>
          <View>
            <Text style={styles.header}>Employee Salary Details</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableHeaderCell,
                    styles.cellWidth,
                    styles.headerColor,
                  ]}
                >
                  Employee No.
                </Text>
                <Text
                  style={[
                    styles.tableHeaderCell,
                    styles.cellWidth,
                    styles.headerColor,
                  ]}
                >
                  Employee Name
                </Text>
                <Text
                  style={[
                    styles.tableHeaderCell,
                    styles.cellWidth,
                    styles.headerColor,
                  ]}
                >
                  Department
                </Text>
                <Text
                  style={[
                    styles.tableHeaderCell,
                    styles.cellWidth,
                    styles.headerColor,
                  ]}
                >
                  Amount
                </Text>
              
                <Text
                  style={[
                    styles.tableHeaderCell,
                    styles.cellWidth,
                    styles.headerColor,
                  ]}
                >
                  Date
                </Text>
                
              </View>
              {data &&
                data.map((item) => (
                  <View style={styles.tableRow} key={item._id}>
                    <Text style={[styles.tableCell, styles.cellWidth]}>
                      {item.empno}
                    </Text>
                    <Text style={[styles.tableCell, styles.cellWidth]}>
                      {item.empname}
                    </Text>
                    <Text style={[styles.tableCell, styles.cellWidth]}>
                      {item.department}
                    </Text>
                    <Text style={[styles.tableCell, styles.cellWidth]}>
                      {item.amount}
                    </Text>
                    <Text style={[styles.tableCell, styles.cellWidth]}>
                      {item.date}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: "center",
    },
    table: {
      display: "table",
      width: "auto",
      marginVertical: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
    },
    tableHeaderCell: {
      fontSize: 12,
      fontWeight: "bold",
      padding: 5,
      textAlign: "center",
      borderRightWidth: 1,
      borderRightColor: "#000",
      borderTopWidth: 1,
      borderTopColor: "#000",
    },
    tableCell: {
      fontSize: 12,
      padding: 5,
      textAlign: "center",
      borderRightWidth: 1,
      borderRightColor: "#000",
    },
    cellWidth: {
      width: "20%", // Adjust the width as needed for each column
    },
    headerColor: {
      backgroundColor: "#15803d", // Background color for headers
      color: "#ffffff", // Text color for headers
    },
  });
  return (
    <div className="flex flex-col md:flex-row relative">
      <div className="absolute inset-y-0 left-0 z-10">
        <Adminnavbar />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center drop-shadow-lg text-gray-800">
          <div></div>
          <h1 className="text-4xl py-8 mb-10 bg-red-500 text-white rounded-lg w-96 h-16 flex justify-center items-center mx-auto mt-2">
            Salary Management
          </h1>
        </div>
        <div className="flex flex-col">
          <div className="sm:-mx-6 lg:-mx-8 w-2/3 mx-auto">
            <div className="flex justify-between items-center mb-4">
              <button
                className="px-3 rounded-md border border-transparent shadow-sm py-2 bg-green-800 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleOpen}
                style={{ width: "200px", marginLeft: "500px" }}
              >
                Add Employee Salary
              </button>
              <PDFDownloadLink
                document={
                  <MyDocument data={searchQuery ? filteredData : data} />
                }
                fileName="sallary_management.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                    <button
                      className="px-3 rounded-md border border-transparent shadow-sm py-2 bg-green-800 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      style={{ width: "200px", marginLeft: "00px" }}
                    >
                      Download PDF
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
            <AddEMPSalary open={openDialog} setOpen={setOpenDialog} />
            {isFetching && <div>Loading...</div>}
            {isError && <div>Error fetching data</div>}
            {isSuccess && (
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="mt-4 px-4 py-2 mb-4 border-2 border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full"
                  style={{ marginLeft: "350px" }}
                />
                <table
                  className="min-w-full divide-y divide-gray-200"
                  style={{ marginLeft: "350px" }}
                >
                  <thead className="bg-green-300">
                    <tr>
                      <th className="px-6 py-3 text-center text-[17px] font-sans font-semibold text-blue-950 uppercase tracking-wider">
                        Employee No.
                      </th>
                      <th className="px-6 py-3 text-center text-[17px] font-sans font-semibold text-blue-950 uppercase tracking-wider">
                        Employee Name
                      </th>
                      <th className="px-6 py-3 text-center text-[17px] font-sans font-semibold text-blue-950 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-center text-[17px] font-sans font-semibold text-blue-950 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-center text-[17px] font-sans font-semibold text-blue-950 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-center text-[17px] font-sans font-semibold text-blue-950 uppercase tracking-wider">
                       Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-green-300">
                    {(searchQuery ? filteredData : data).map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.empno}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.empname}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button className="px-3" >
        <box-icon
         
          color={"#b91c1c"}
          size="20px"
          name="trash"
        ></box-icon>
      </button>

      <button className="px-3">
        <box-icon
         
          color= "#030712"
          size="20px"
          name="edit-alt"
        ></box-icon>
      </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EMPSallary;
