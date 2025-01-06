import { HandleDelete } from '../../utils/HandleDelete'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '@function'

import { MdFolderDelete } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'
import { IoReloadCircle } from 'react-icons/io5'

import Loading from '../Loading'

function DataTable({ url, header, isViewAllowed }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRows, setSelectedRows] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20) // Rows per page

    const [sortColumn, setSortColumn] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')

    const navigate = useNavigate()

    const fetchDataAsync = async () => {
        setLoading(true)
        setError(null)
        try {
            await fetchData(url, setData, setLoading)
        } catch (err) {
            setError('Failed to fetch data. Please try again later.')
            console.error('Error fetching data:', err)
        }
    }

    useEffect(() => {
        fetchDataAsync()
    }, [url])

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    if (error) {
        return <div>{error}</div>
    }

    if (data.length === 0) {
        return <div>No data available</div>
    }

    const filteredData = data.filter((item) => {
        return Object.values(item)
            .map((value) => String(value).toLowerCase()) // Convert all values to lowercase
            .join(' ') // Join all values into a single string
            .includes(searchQuery.toLowerCase()) // Check if search query is present
    })

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
    })

    const totalItems = sortedData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const columns = Object.keys(data[0])
        .filter((column) => column !== '_id')
        .slice(0, 8)

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortColumn(column)
            setSortOrder('asc')
        }
    }

    const handleRowSelect = (id) => {
        setSelectedRows((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((item) => item !== id) // Unselect row
            } else {
                return [...prevSelected, id] // Select row
            }
        })
    }

    const handleBulkDelete = () => {
        if (selectedRows.length > 0) {
            selectedRows.forEach((id) => HandleDelete(id, url, false))
            setSelectedRows([])
        } else {
            alert('Please select rows to delete.')
        }
    }

    return (
        <div className="mx-2 my-4">
            <div>
                <div>
                    <div className="flex justify-between">
                        <div className="text-xl font-semibold">{header}.</div>
                        <div className="flex space-x-2">
                            <div
                                className="btn btn-circle btn-error"
                                onClick={handleBulkDelete}
                                disabled={selectedRows.length <= 1}
                            >
                                <MdFolderDelete size={30} />
                            </div>
                            <div
                                className="btn btn-circle btn-info"
                                onClick={() => navigate(`/testCreate/${url}`)}
                            >
                                <IoMdAddCircle size={30} />
                            </div>
                            <div
                                className="btn btn-circle btn-success"
                                onClick={() => {
                                    window.location.reload()
                                }}
                            >
                                <IoReloadCircle size={30} />
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-between space-x-2">
                        {/* Rows per page dropdown */}
                        <select
                            className="select select-bordered"
                            value={itemsPerPage}
                            onChange={(e) =>
                                setItemsPerPage(Number(e.target.value))
                            }
                        >
                            <option value={5}>5 rows</option>
                            <option value={10}>10 rows</option>
                            <option value={20}>20 rows</option>
                            <option value={50}>50 rows</option>
                        </select>

                        {/* Pagination Controls */}
                        <div className="join">
                            <button
                                className="btn join-item"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                            <button className="btn join-item">
                                Page {currentPage} of {totalPages}
                            </button>
                            <button
                                className="btn join-item"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <label className="input input-bordered flex w-full items-center gap-2">
                            Search
                            <input
                                className="w-full"
                                type="text"
                                placeholder="Search Entry .."
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
                    </div>
                </div>

                {paginatedData.length === 0 ? (
                    <p>No matching records found.</p>
                ) : (
                    <div
                        className="mt-4 overflow-x-auto"
                        style={{
                            border: '0.01rem solid #999',
                            borderRadius: '0.5rem',
                        }}
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
                                                    const isChecked =
                                                        e.target.checked
                                                    if (isChecked) {
                                                        setSelectedRows(
                                                            data.map(
                                                                (item) =>
                                                                    item._id
                                                            )
                                                        )
                                                    } else {
                                                        setSelectedRows([])
                                                    }
                                                }}
                                                checked={
                                                    selectedRows.length ===
                                                    data.length
                                                }
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
                                            {column.charAt(0).toUpperCase() +
                                                column.slice(1)}{' '}
                                            {sortColumn === column
                                                ? sortOrder === 'asc'
                                                    ? '↑'
                                                    : '↓'
                                                : ''}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-gray-200"
                                    >
                                        <td>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    onChange={() =>
                                                        handleRowSelect(
                                                            item._id
                                                        )
                                                    }
                                                    checked={selectedRows.includes(
                                                        item._id
                                                    )}
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
                                                                '_blank'
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-neutral btn-xs"
                                                    onClick={() =>
                                                        navigate(
                                                            `/testUpdate/${item._id}?doc=${url}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-error btn-xs"
                                                    onClick={() =>
                                                        HandleDelete(
                                                            item._id,
                                                            url,
                                                            true
                                                        )
                                                    }
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
    )
}

export default DataTable
