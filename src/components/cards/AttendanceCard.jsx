import { useEffect, useState } from 'react'

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
            <div
                className="tooltip tooltip-right flex w-max cursor-pointer items-center space-x-4 rounded-xl bg-base-300 p-4 text-sm"
                data-tip={data.authorization}
                onClick={() => document.getElementById('my_modal').showModal()}
            >
                <div className="flex items-center space-x-2">
                    <div className="btn btn-circle overflow-hidden">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                    <div>
                        {data.name} /{data.username}
                    </div>
                </div>
                <div>{data.department}</div>
                <div>{data.designation}</div>
                <div>{data.createdAt.slice(0, 10)}</div>
                <div className="rounded-xl bg-primary px-2 text-base-100">
                    {data.shiftType.slice(0, 10)} Shift
                </div>
            </div>
            <AttendanceModal data={details} />
        </>
    )
}

export default AttendanceCard
