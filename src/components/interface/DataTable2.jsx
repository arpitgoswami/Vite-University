import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterData, fetchData, handleDelete } from "@function";
import Loading from "../Loading";

function DataTable2({ url }) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchDataAsync = async () => {
      try {
        await fetchData(url, setData, setLoading); // Use 'url' prop here
        setReload(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isMounted) {
      fetchDataAsync();
    }

    return () => {
      isMounted = false;
    };
  }, [reload, url]); // Include 'url' in the dependency array

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);
  const limitedColumns = columns.slice(0, 5);
  const filteredData = filterData(data, searchQuery, limitedColumns);

  return (
    <div className="container mx-auto p-6 overflow-hidden">
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-sm/6 font-semibold text-gray-800">Sales Data</h1>
        <div className="flex gap-2">
          <button
            onClick={() => fetchData(url, setData, setLoading)}
            className="bg-blue-500 text-white text-sm/6 px-3 py-1.5 rounded-md hover:bg-blue-600"
          >
            Reload
          </button>

          <button
            onClick={() => navigate(`/testCreate/${url}`)}
            className="bg-green-500 text-white text-sm/6 px-3 py-1.5 rounded-md hover:bg-green-600"
          >
            Add New Entry
          </button>
        </div>
      </div>
      <hr className="my-2" />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="text-xs table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                S. No.
              </th>
              {limitedColumns
                .filter((column) => column !== "_id") // Exclude _id column
                .map((column) => (
                  <th
                    key={column}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </th>
                ))}
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                {limitedColumns
                  .filter((column) => column !== "_id") // Exclude _id column
                  .map((column) => (
                    <td
                      key={column}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {item[column]}
                    </td>
                  ))}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/testUpdate/${item._id}?doc=${url}`)
                    }
                    className={`px-2 py-1 bg-purple-500 text-white rounded-md text-xs hover:bg-purple-600 ${
                      data.length === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={data.length === 1}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (data.length > 1) {
                        handleDelete(item._id, url, setReload);
                      }
                    }}
                    className={`ml-2 px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 ${
                      data.length === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={data.length === 1}
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

export default DataTable2;
