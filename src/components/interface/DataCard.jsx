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

  const filteredData = data.filter((item) => {
    return Object.values(item)
      .map((value) => String(value).toLowerCase())
      .join(" ")
      .includes(searchQuery.toLowerCase());
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {paginatedData.map((item) => (
              <div
                key={item._id}
                className="card card-compact bg-base-100 shadow-md"
              >
                <div className="card-body">
                  {Object.entries(item).map(
                    ([key, value]) =>
                      key !== "_id" && (
                        <div key={key} className="flex justify-between">
                          <span className="font-semibold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <span>{String(value)}</span>
                        </div>
                      )
                  )}
                  <div className="card-actions justify-end space-x-2 mt-4">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DataCard;
