import React, { useState, useEffect } from 'react'

function Attendance() {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', status: '', time: null },
        { id: 2, name: 'Jane Smith', status: '', time: null },
        // ... existing code ...
    ])

    const markAttendance = (employeeId, status) => {
        const currentTime = new Date().toLocaleTimeString()
        setEmployees(
            employees.map((emp) =>
                emp.id === employeeId
                    ? { ...emp, status, time: currentTime }
                    : emp
            )
        )
    }

    return (
        <div className="min-h-[100vh] bg-gray-50 p-4">
            <div className="mb-6 flex justify-between">
                <div className="text-xl font-bold">Attendance</div>
                <div className="text-gray-500">
                    {new Date().toLocaleDateString()}
                </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-md">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-3 text-left">
                                Employee Name
                            </th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Time</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="border-b">
                                <td className="px-4 py-3">{employee.name}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-block rounded px-2 py-1 ${
                                            employee.status === 'Present'
                                                ? 'bg-green-100 text-green-800'
                                                : employee.status === 'Absent'
                                                  ? 'bg-red-100 text-red-800'
                                                  : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {employee.status || 'Not Marked'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {employee.time || '-'}
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() =>
                                            markAttendance(
                                                employee.id,
                                                'Present'
                                            )
                                        }
                                        className="mr-2 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                                    >
                                        Present
                                    </button>
                                    <button
                                        onClick={() =>
                                            markAttendance(
                                                employee.id,
                                                'Absent'
                                            )
                                        }
                                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                    >
                                        Absent
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Attendance
