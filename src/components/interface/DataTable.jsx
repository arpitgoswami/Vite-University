import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "@function";
import Loading from "../Loading";
import { HandleDelete } from "../../utils/HandleDelete";
import Modal from "../Modal";

function DataTable({ url, header, isViewAllowed }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Rows per page

  // Sorting states
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const fetchDataAsync = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchData(url, setData, setLoading);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [url]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    return Object.values(item)
      .map((value) => String(value).toLowerCase()) // Convert all values to lowercase
      .join(" ") // Join all values into a single string
      .includes(searchQuery.toLowerCase()); // Check if search query is present
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = Object.keys(data[0])
    .filter((column) => column !== "_id")
    .slice(0, 10);

  // Handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id); // Unselect row
      } else {
        return [...prevSelected, id]; // Select row
      }
    });
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length > 0) {
      selectedRows.forEach((id) => HandleDelete(id, url, false));
      setSelectedRows([]); // Clear selected rows after bulk delete
    } else {
      alert("Please select rows to delete.");
    }
  };

  return (
    <div className="p-4">
      <div>
        <div>
          <p className="text-3xl font-bold">{header} Data</p>
          <p className="text-md opacity-50">Live {header} Record</p>
          <div className="flex space-x-2 mt-8">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                className="w-full"
                type="text"
                placeholder="Search Entry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button className="btn btn-primary" onClick={fetchDataAsync}>
              Reload
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/testCreate/${url}`)}
            >
              Add New Entry
            </button>
            <button
              className="btn btn-error"
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
            >
              Bulk Delete
            </button>
          </div>
        </div>

        <div className="mt-4 space-x-2 flex justify-end">
          {/* Rows per page dropdown */}
          <select
            className="select select-bordered"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
          </select>

          {/* Pagination Controls */}
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button className="join-item btn">
              Page {currentPage} of {totalPages}
            </button>
            <button
              className="join-item btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>

        {paginatedData.length === 0 ? (
          <p>No matching records found.</p>
        ) : (
          <div
            className="overflow-x-auto mt-4"
            style={{ border: "0.01rem solid #999", borderRadius: "0.5rem" }}
          >
            <table className="table table-sm">
              <thead>
                <tr className="bg-[#F2F2F2]">
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setSelectedRows(data.map((item) => item._id));
                          } else {
                            setSelectedRows([]);
                          }
                        }}
                        checked={selectedRows.length === data.length}
                      />
                    </label>
                  </th>
                  <th>ACTIONS</th>
                  {columns.map((column) => (
                    <th
                      key={column}
                      onClick={() => handleSort(column)}
                      className="cursor-pointer"
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                      {sortColumn === column
                        ? sortOrder === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-200">
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={() => handleRowSelect(item._id)}
                          checked={selectedRows.includes(item._id)}
                        />
                      </label>
                    </td>
                    <td>
                      <div className="space-x-2">
                        {isViewAllowed && (
                          <button
                            className="btn btn-neutral btn-xs"
                            onClick={() =>
                              window.open(
                                `/invoice/${item._id}/${url}`,
                                "_blank"
                              )
                            }
                          >
                            View
                          </button>
                        )}
                        <button
                          className="btn btn-neutral btn-xs"
                          onClick={() =>
                            navigate(`/testUpdate/${item._id}?doc=${url}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => HandleDelete(item._id, url, true)}
                          disabled={data.length === 1}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    {columns.map((column) => (
                      <td key={column}>{item[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
