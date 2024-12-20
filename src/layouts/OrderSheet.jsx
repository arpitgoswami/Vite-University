import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderSheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/order_sheet")
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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Order Sheet</h1>
      <hr className="mt-4" />
      {data.length > 0 ? (
        <table className="w-full border border-gray-300 text-left bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border-b border-gray-300">Identity</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Overall Status
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Design</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Invoice No.
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                Invoice Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-gray-100 ${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {Object.values(item).map((value, colIndex) => (
                  <td
                    onClick={(e) => console.log(e.target.innerText)}
                    key={colIndex}
                    className="px-4 py-2 border-b border-gray-300 cursor-pointer text-gray-600"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-500 text-center mt-4">No data available</div>
      )}
    </div>
  );
}

export default OrderSheet;
