import { useEffect, useState } from 'react'
import { readCookie } from '../../utils/cookieUtils'
import { IoReloadCircle } from 'react-icons/io5'
import { LuAlarmClockPlus } from 'react-icons/lu'
import { LuAlarmClockMinus } from 'react-icons/lu'

import axios from '@axios'

function Attendance() {
    const username = readCookie('username')
    const [details, setDetails] = useState([])
    const [search, setSearch] = useState(username)

    useEffect(() => {
        axios
            .get(`/attendance/${search}`)
            .then((response) => {
                setDetails(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [search])

    const handleTimeout = () => {
        axios
            .post('/attendance/timeout', { username })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    console.log(search)

    const handleTimein = () => {
        axios
            .post('/attendance/timein', { username })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className="mx-2 my-4">
            <div className="flex items-center justify-between">
                <div className="mb-4 text-xl font-semibold">
                    Attendance Records.
                </div>
                <div className="flex space-x-2">
                    <div className="btn btn-primary" onClick={handleTimein}>
                        <LuAlarmClockPlus size={24} />
                        Time In
                    </div>
                    <div className="btn btn-primary" onClick={handleTimeout}>
                        <LuAlarmClockMinus size={24} />
                        Time Out
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

            <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                    Username
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search attendance here .."
                        value={search} // Bind the value to the 'search' state
                        onChange={(e) => setSearch(e.target.value)} // Update 'search' state when the user types
                    />
                </label>
            </div>

            <div>
                {details.length > 0 ? (
                    details.map((attendance, index) => (
                        <div key={index} className="mb-4">
                            <div>
                                <strong>Date:</strong> {attendance.date}
                            </div>
                            <div>
                                <strong>Status:</strong> {attendance.status}
                            </div>
                            <div>
                                <strong>Time In:</strong>{' '}
                                {attendance.timeIn || 'N/A'}
                            </div>
                            <div>
                                <strong>Time Out:</strong>{' '}
                                {attendance.timeOut || 'N/A'}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No attendance records found.</div>
                )}
            </div>
        </div>
    )
}

export default Attendance
