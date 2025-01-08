import { useEffect, useState } from 'react'
import { readCookie } from '../../utils/cookieUtils'

import { IoReloadCircle } from 'react-icons/io5'
import { LuAlarmClockPlus, LuAlarmClockMinus } from 'react-icons/lu'

import AttendanceCard from '../../components/cards/AttendanceCard'
import Loading from '../../components/Loading'
import axios from '@axios'

function Attendance() {
    const username = readCookie('username')
    const [details, setDetails] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/users`)
            .then((response) => {
                setDetails(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setDetails('')
                console.error(error)
            })
    }, [])

    console.log(details)

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

    const filteredDetails = details.filter((attendance) =>
        attendance.username.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return <Loading />
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
                        onClick={() => window.location.reload()}
                    >
                        <IoReloadCircle size={30} />
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="mb-4 flex space-x-2">
                <label className="input input-bordered flex w-full items-center gap-2">
                    Username :
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search attendance here .."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value.toLowerCase())
                        }
                    />
                </label>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {filteredDetails.length > 0 ? (
                    filteredDetails.map((attendance, index) => (
                        <AttendanceCard data={attendance} key={index} />
                    ))
                ) : (
                    <div>No attendance records found.</div>
                )}
            </div>
        </div>
    )
}

export default Attendance
