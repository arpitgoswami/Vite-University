import { useEffect, useState } from 'react'
import axios from '@axios'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { BsCheck2 } from 'react-icons/bs'
import { FiTrash2 } from 'react-icons/fi'
import { HiOutlineClipboardList } from 'react-icons/hi'

function Todos() {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const username = localStorage.getItem('username')

    useEffect(() => {
        axios
            .get('todos')
            .then((res) =>
                setData(
                    res.data.filter((record) => record.username === username)
                )
            )
            .catch((err) => console.log(err.message))
    }, [])

    const filteredData = data.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Todos</h1>
                    <button className="btn btn-primary normal-case">
                        <AiOutlinePlus className="mr-2 h-5 w-5" />
                        Create New Todo
                    </button>
                </div>

                <div className="mb-6 rounded bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-gray-600">
                            Total Todos:{' '}
                            <span className="font-semibold text-gray-900">
                                {data.length}
                            </span>
                        </div>
                        <div className="w-1/3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search todos..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="input input-bordered w-full pl-10"
                                />
                                <AiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((record, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md"
                                >
                                    <div className="p-5">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                Todo #{index + 1}
                                            </span>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${
                                                    record.completed
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                            >
                                                {record.completed
                                                    ? 'Completed'
                                                    : 'Pending'}
                                            </span>
                                        </div>
                                        <h3 className="mb-2 font-medium text-gray-900">
                                            {record.title}
                                        </h3>
                                        <p className="mb-4 text-sm text-gray-500">
                                            {new Date(
                                                record.createdAt
                                            ).toLocaleString('en-US', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })}
                                        </p>
                                        <div className="flex space-x-2">
                                            <button className="btn btn-primary btn-sm flex-1">
                                                <BsCheck2 className="mr-1 h-4 w-4" />
                                                Approve
                                            </button>
                                            <button className="btn btn-error btn-sm flex-1">
                                                <FiTrash2 className="mr-1 h-4 w-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <HiOutlineClipboardList className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="text-lg font-medium text-gray-900">
                                    No todos found
                                </h3>
                                <p className="text-gray-500">
                                    Try adjusting your search or create a new
                                    todo
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todos
