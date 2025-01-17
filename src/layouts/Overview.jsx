import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'

import Loading from '../components/Loading'

import axios from '@axios'

function Overview() {
    const [loading, setLoading] = useState(true)
    const [pendingCount, setPendingCount] = useState(null)
    const [pendingSales, setPendingSales] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPendingCount = async () => {
            try {
                const response = await axios.get('/status/pending')
                setPendingCount(response.data.pendingCount)
                setPendingSales(response.data.pendingRecords)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching pending count:', error)
            }
        }
        fetchPendingCount()
    }, [])

    let username = localStorage.getItem('username')
    username = username.charAt(0).toUpperCase() + username.slice(1)

    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    const steps = [
        { id: 1, title: 'Sales', completed: true },
        { id: 2, title: 'Approval', completed: true },
        { id: 3, title: 'Designer', completed: true },
        { id: 4, title: 'Accounts', completed: false },
        { id: 5, title: 'MD Approval', completed: false },
        { id: 6, title: 'PPIC', completed: false },
        { id: 7, title: 'Production', completed: false },
    ]

    return (
        <div className="mx-2 my-4 w-[100vh-4rem]">
            <h1 className="text-xl font-semibold">Overview.</h1>
            <p className="mt-2">
                My Authorization: <span className="font-bold">{username}</span>
            </p>
            <div className="divider"></div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center space-x-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex items-center space-x-4"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                        step.completed
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                    {index + 1}
                                </div>
                                <h4
                                    className={`mt-2 text-sm font-medium ${
                                        step.completed
                                            ? 'text-green-700'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    {step.title}
                                </h4>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-1 w-12 ${
                                        steps[index + 1].completed
                                            ? 'bg-green-500'
                                            : 'bg-gray-300'
                                    }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="divider"></div>

            <div className="mt-4">
                <h2 className="font-semibold">
                    Pending Sales Records ({pendingCount} Pending)
                </h2>
                {pendingSales.length > 0 ? (
                    <div className="mt-4 overflow-x-auto rounded-lg bg-white shadow-md">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                                        GST Number
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingSales.map((sale) => (
                                    <tr
                                        key={sale['SALES ID']}
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() =>
                                            navigate(
                                                `/approval/${sale['SALES ID']}?doc=sales&sales_id=${sale._id}`
                                            )
                                        }
                                    >
                                        <td className="px-6 py-4 text-center text-sm text-gray-800">
                                            {sale['GST NUMBER']}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-800">
                                            {sale['STATUS']}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-800">
                                            {sale['DESCRIPTION']}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-800">
                                            {new Date(
                                                sale['CREATED AT']['$date']
                                            ).toLocaleString()}
                                        </td>
                                        <td className="btn btn-circle btn-neutral btn-sm m-auto mt-2 flex items-center">
                                            <FaEye size={20} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="mt-4 text-gray-500">
                        No pending sales records found.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Overview
