import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { generatePDF } from "@generatePDF";
import axios from "@axios";
import { useRef } from "react";

function capitalize(str) {
  return str.toUpperCase(); // Convert all letters to uppercase
}

const InvoiceTable = () => {
  const { id, doc } = useParams(); // Fetch 'id' and 'doc' from URL params
  const [data, setData] = useState([]); // State to store column names
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const contentRef = useRef(); // Error state

  useEffect(() => {
    // Fetch data based on 'doc' and 'id' when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${doc}/${id}`); // API call using 'doc' and 'id'
        const fetchedData = Array.isArray(response.data)
          ? response.data
          : [response.data]; // Ensure fetchedData is always an array
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchData();
  }, [id, doc]); // Re-fetch data if either 'id' or 'doc' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div ref={contentRef} className="p-8 max-w-6xl mx-auto  bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-right">
            <img src="/logo.jpg" alt="Logo" className="w-[20rem] mb-8" />
          </div>
          <div>
            <h1 className="text-xs/6 font-bold">ALPEX PHARMA PVT. LTD.</h1>
            <p className="text-xs/6">
              Vill. Ogli, Suketi Road, Kala-Amb, Teh. Nahan, Dist.
              Sirmour-173030 (H.P)
            </p>
            <p className="text-xs/6">marketing@alpexpharma.in</p>
          </div>
        </div>

        <div className="mb-4">
          <table className="text-xs table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Recipient
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  M/S CYNAK PHARMA
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Address
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Panchkula
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Date
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  12-Dec-2024
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Transporter
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Transporter Name
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Destination
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Destination Name
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Mode of Transport
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Mode of Transport
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-1 py-1 font-bold">
                  Courier
                </td>
                <td
                  className="border border-gray-300 px-1 py-1"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Courier Name
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Section */}
        <table className="text-xs table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1 text-left">
                S.No
              </th>
              {data.length > 0 &&
                Object.keys(data[0])
                  .filter((column) => column !== "_id") // Exclude '_id' column
                  .map((column) => (
                    <th
                      key={column}
                      className="border border-gray-300 px-2 py-1 text-left"
                    >
                      {capitalize(column)} {/* Capitalize the column name */}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1">
                  {index + 1}
                </td>
                {Object.keys(item)
                  .filter((column) => column !== "_id") // Exclude '_id' column
                  .map((column) => (
                    <td
                      key={column}
                      className="border border-gray-300 px-2 py-1"
                    >
                      {item[column]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between">
          {/* Terms & Conditions */}
          <div className="mt-4 w-1/2 pr-2">
            <table className="text-xs table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="border border-gray-300 px-2 py-1 text-left font-bold bg-gray-200"
                  >
                    Terms & Conditions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">
                    No approval charges.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">
                    Cylinder charges Rs. 1250 per color/product.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">
                    Security charges 3000/- (if qty less than 500 box).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">4</td>
                  <td className="border border-gray-300 px-2 py-1">
                    30% advance and 70% on dispatch.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">5</td>
                  <td className="border border-gray-300 px-2 py-1">
                    Drip off box and embossed brand name.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bank Details */}
          <div className="mt-4 w-1/2 pl-2">
            <table className="text-xs table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="border border-gray-300 px-2 py-1 text-left font-bold bg-gray-200"
                  >
                    Bank Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">
                    ALPEX PHARMA PVT LIMITED
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">
                    BANK: Punjab National Bank
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">
                    Account: 2912008700007123
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">4</td>
                  <td className="border border-gray-300 px-2 py-1">
                    IFSC Code: PUNB0291200
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">5</td>
                  <td className="border border-gray-300 px-2 py-1">
                    Branch: Parwanoo (HP) 173220
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-xs text-right">
          <b>Grand Total:</b> 2,50,400 | <b>Advance</b>: 30%
        </div>
      </div>
      <button
        onClick={() => generatePDF(contentRef)} // Pass the ref to the function
        className="bg-gray-500 text-white text-xs/6 px-3 py-1.5 rounded-md hover:bg-gray-600 mt-4"
      >
        Download PDF
      </button>
    </>
  );
};

export default InvoiceTable;
