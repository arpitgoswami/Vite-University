import React, { useState, useEffect } from "react";
import axios from "@axios";

// Utility function to capitalize each word in a string
function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function OrderSheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("users/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Get the column names from the first object in the data
  const columns = Object.keys(data[0]);

  // Limit to the first 5 columns
  const limitedColumns = columns.slice(0, 5);

  return (
    <div className="container mx-auto p-6 overflow-hidden">
      <h1 className="text-sm/6 font-semibold mb-4">Sales Data</h1>
      <hr className="my-2" />

      <div className="overflow-x-auto">
        <table className="text-sm/6 table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {limitedColumns.map((column) => (
                <th key={column} className="border border-gray-300 px-4 py-2">
                  {capitalize(column)} {/* Capitalize the column name */}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2">Actions</th>{" "}
              {/* Actions Column */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {limitedColumns.map((column) => (
                  <td key={column} className="border border-gray-300 px-2 py-1">
                    {item[column]}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => alert(`Edit item with ID: ${item.id}`)}
                    className="text-purple-700 font-medium underline cursor-pointer"
                  >
                    Edit
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

export default OrderSheet;
