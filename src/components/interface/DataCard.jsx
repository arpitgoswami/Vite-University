import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "@function";
import Loading from "../Loading";
import { HandleDelete } from "../../utils/HandleDelete";

function DataCard({ url, header, isViewAllowed }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const fetchDataAsync = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchData(url, setData, setLoading);
    } catch {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [url]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>No data available</div>;

  const filteredData = data.filter((item) =>
    Object.values(item)
      .map((value) => String(value).toLowerCase())
      .join(" ")
      .includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const columns = Object.keys(data[0])
    .filter((column) => column !== "_id")
    .slice(0, 8);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedRows.length > 0) {
      selectedRows.forEach((id) => HandleDelete(id, url, false));
      setSelectedRows([]);
    } else {
      alert("Please select rows to delete.");
    }
  };

  return (
    <div className="p-4">
      <div>
        <div className="flex space-x-2 mt-8">
          <input
            className="input input-bordered flex items-center w-full"
            type="text"
            placeholder="Search Entry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

        <div className="mt-4 space-x-2 flex justify-end">
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
          <table className="table table-sm mt-4">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => {
                      setSelectedRows(
                        e.target.checked ? data.map((item) => item._id) : []
                      );
                    }}
                    checked={selectedRows.length === data.length}
                  />
                </th>
                <th>ACTIONS</th>
                {columns.map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="cursor-pointer"
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    {sortColumn === column &&
                      (sortOrder === "asc" ? " ↑" : " ↓")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleRowSelect(item._id)}
                      checked={selectedRows.includes(item._id)}
                    />
                  </td>
                  <td>
                    {isViewAllowed && (
                      <button
                        className="btn btn-neutral btn-xs"
                        onClick={() =>
                          window.open(`/invoice/${item._id}/${url}`, "_blank")
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
                  </td>
                  {columns.map((column) => (
                    <td key={column}>{item[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DataCard;
