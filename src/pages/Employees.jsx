import { useEffect, useState } from 'react'

import axios from '@axios'

function Employees() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('employees')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err.message))
    }, [])

    return (
        <div className="min-h-[100vh] bg-gray-50 p-4">
            <div className="flex justify-between">
                <div className="text-xl font-bold">Employees</div>
                <button className="btn btn-outline btn-primary btn-sm">
                    Create New User
                </button>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-3 gap-4">
                {data.length > 0 ? (
                    data.map((record, index) => (
                        <div
                            key={index}
                            className="rounded-md bg-white p-4 shadow-lg"
                        >
                            <p>{record.username}</p>
                            <p>{record.authorization}</p>
                            <p>{record.designation}</p>
                            <p>{record.status}</p>
                        </div>
                    ))
                ) : (
                    <div>No user found</div>
                )}
            </div>
        </div>
    )
}

export default Employees
