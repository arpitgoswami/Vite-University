import React, { useState, useEffect } from "react";
import { filterData, fetchData, handleDelete } from "@function";
import { useNavigate } from "react-router-dom";

// Function to capitalize the first letter of each word in a string
function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SalesReport() {
  const [data, setData] = useState([]); // State for storing data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate(); // Navigate for adding new entry

  const url = "sales"; // Define the API endpoint

  // Fetch data on component mount
  useEffect(() => {
    fetchData(url, setData, setLoading);
  }, []);

  // Loading and empty data handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Get column names from the first data record
  const columns = Object.keys(data[0]);

  // Limit columns to display
  const limitedColumns = columns.slice(0, 5);

  // Filter data based on the search query and limited columns
  const filteredData = filterData(data, searchQuery, limitedColumns);

  return (
    <div className="container mx-auto p-6 overflow-hidden">
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-sm/6 font-semibold text-gray-800">Sales Data</h1>
        <div className="flex gap-2">
          {/* Reload Button */}
          <button
            onClick={() => fetchData(url, setData, setLoading)}
            className="bg-blue-500 text-white text-sm/6 px-3 py-1.5 rounded-md hover:bg-blue-600"
          >
            Reload
          </button>
          {/* Add New Entry Button */}
          <button
            onClick={() => window.open(`/testCreate/${url}`, "_blank")} // Navigate to create page
            className="bg-green-500 text-white text-sm/6 px-3 py-1.5 rounded-md hover:bg-green-600"
          >
            Add New Entry
          </button>
        </div>
      </div>
      <hr className="my-2" />

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

      {/* Table for displaying filtered data */}
      <div className="overflow-x-auto">
        <table className="text-xs table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {/* Table Header: Displaying limited columns */}
              {limitedColumns.map((column) => (
                <th
                  key={column}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {capitalize(column)} {/* Capitalize the column name */}
                </th>
              ))}
              {/* Actions Column */}
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Table Body: Displaying filtered data */}
            {filteredData.map((item, index) => (
              <tr key={index}>
                {/* Displaying each data field */}
                {limitedColumns.map((column) => (
                  <td key={column} className="border border-gray-300 px-4 py-2">
                    {item[column]}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  {/* Edit Button */}
                  <button
                    onClick={() =>
                      window.open(
                        `/testUpdate/${item._id}?doc=${url}`,
                        "_blank"
                      )
                    }
                    className="px-2 py-1 bg-purple-500 text-white rounded-md text-xs hover:bg-purple-600"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id, url)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesReport;
