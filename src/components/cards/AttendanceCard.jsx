import { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import AttendanceModal from './AttendanceModal'
import axios from '@axios'

function AttendanceCard({ data }) {
    const [details, setDetails] = useState([])

    useEffect(() => {
        axios
            .get(`/attendance/${data.username}`)
            .then((response) => {
                setDetails(response.data)
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <Draggable grid={[10, 10]}>
                <div className="flex cursor-move flex-col items-start space-y-2 rounded-lg bg-neutral p-4 text-base-100 shadow-md hover:scale-105">
                    <div className="flex items-center space-x-2">
                        <div className="btn btn-circle overflow-hidden">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="Profile"
                                className="h-10 w-10 rounded-full"
                            />
                        </div>
                        <div className="text-sm font-semibold">
                            {data.name}{' '}
                            <span className="text-gray-400">
                                /{data.username}
                            </span>
                        </div>
                    </div>
                    <div className="w-full space-y-2 text-xs text-base-100">
                        <div>Dept: {data.department}</div>
                        <div>Designation: {data.designation}</div>
                        <p>Joining Date: {data.createdAt.slice(0, 10)}</p>
                        <div className="flex justify-between">
                            <div
                                className={`rounded-full bg-primary px-2 text-xs ${data.status === 'Active' ? 'bg-success' : 'bg-error'}`}
                            >
                                {data.status}
                            </div>
                            <div className="rounded-full bg-primary px-2 text-xs">
                                {data.shiftType.slice(0, 10)} Shift
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-sm w-full text-xs"
                        onClick={() =>
                            document.getElementById('my_modal').showModal()
                        }
                    >
                        Show Attendances
                    </button>
                </div>
            </Draggable>
            <AttendanceModal data={details} />
        </>
    )
}

export default AttendanceCard
