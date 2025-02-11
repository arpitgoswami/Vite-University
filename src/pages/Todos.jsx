import { useEffect, useState } from 'react'

import axios from '@axios'

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
        <div className="bg-gray-50 p-4">
            <div className="flex justify-between">
                <div className="text-xl font-bold">Todos</div>
                <button className="btn btn-outline btn-primary btn-sm">
                    Create New Todos
                </button>
            </div>

            <hr className="my-4" />

            <div>Total Todos Records: {data.length}</div>

            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search todos.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {filteredData.length > 0 ? (
                    filteredData.map((record, index) => (
                        <div
                            key={index}
                            className="rounded-md bg-white p-4 shadow-lg"
                        >
                            <h3>Todo: {index + 1}</h3>
                            <p>{record.title}</p>
                            <p>
                                {record.completed
                                    ? 'Completed'
                                    : 'Not Completed'}
                            </p>
                            <p>
                                {new Date(record.createdAt).toLocaleString(
                                    'en-US',
                                    {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    }
                                )}
                            </p>
                            <div className="space-x-2">
                                <button className="btn btn-primary btn-sm">
                                    Approve
                                </button>
                                <button className="btn btn-error btn-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No todos found</h1>
                )}
            </div>
        </div>
    )
}

export default Todos
