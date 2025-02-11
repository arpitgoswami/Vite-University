import { useEffect, useState } from 'react'

import axios from '@axios'

function Candidates() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('rejected')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err.message))
    }, [])

    return (
        <div className="min-h-[100vh] bg-gray-50 p-4">
            <div className="flex justify-between">
                <div className="text-xl font-bold">Candidates</div>
                <button className="btn btn-outline btn-primary btn-sm">
                    Add New Candidate
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
                            <p>{record.name}</p>
                            <p>{record.email}</p>
                        </div>
                    ))
                ) : (
                    <div>No candidate found</div>
                )}
            </div>
        </div>
    )
}

export default Candidates
