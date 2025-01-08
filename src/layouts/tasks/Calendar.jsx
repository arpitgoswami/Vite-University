import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from '@axios'

function AttendanceCalendar() {
    const [attendanceData, setAttendanceData] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [details, setDetails] = useState(null)
    const [presentDaysCount, setPresentDaysCount] = useState(0)

    const username = 'arpit'

    useEffect(() => {
        axios
            .get(`attendance/${username}`)
            .then((response) => {
                setAttendanceData(response.data)
                calculateMonthlyPresence(response.data, new Date()) // Calculate for the current month initially
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const calculateMonthlyPresence = (data, month) => {
        const year = month.getFullYear()
        const monthIndex = month.getMonth() // 0-based index
        const presentDays = data.filter(
            (entry) =>
                entry.status === 'Present' &&
                new Date(entry.date).getFullYear() === year &&
                new Date(entry.date).getMonth() === monthIndex
        )
        setPresentDaysCount(presentDays.length)
    }

    const getTileContent = ({ date }) => {
        const formattedDate = date.toISOString().split('T')[0]
        const attendance = attendanceData.find(
            (entry) => entry.date === formattedDate
        )

        if (attendance) {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        color:
                            attendance.status === 'Present' ? 'green' : 'red',
                    }}
                >
                    {attendance.status === 'Present' ? '✔️' : '❌'}
                </div>
            )
        }

        return null
    }

    const handleDateClick = (date) => {
        const formattedDate = date.toISOString().split('T')[0]
        const attendance = attendanceData.find(
            (entry) => entry.date === formattedDate
        )
        setSelectedDate(formattedDate)
        setDetails(
            attendance || {
                date: formattedDate,
                status: 'No Data',
                remarks: 'No Remarks',
            }
        )
    }

    const handleMonthChange = (date) => {
        calculateMonthlyPresence(attendanceData, date)
    }

    return (
        <div>
            <h1>Attendance Calendar</h1>
            <Calendar
                onClickDay={handleDateClick}
                onActiveStartDateChange={({ activeStartDate }) =>
                    handleMonthChange(activeStartDate)
                }
                tileContent={getTileContent}
            />
            <div style={{ marginTop: '20px' }}>
                <h2>Summary for the Month</h2>
                <p>Days Present: {presentDaysCount}</p>
            </div>
            {selectedDate && details && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Details for {selectedDate}</h2>
                    <p>Status: {details.status}</p>
                    <p>Remarks: {details.remarks}</p>
                    {details.timeIn && (
                        <p>
                            Time In:{' '}
                            {new Date(details.timeIn).toLocaleTimeString()}
                        </p>
                    )}
                    {details.timeOut && (
                        <p>
                            Time Out:{' '}
                            {new Date(details.timeOut).toLocaleTimeString()}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default AttendanceCalendar
