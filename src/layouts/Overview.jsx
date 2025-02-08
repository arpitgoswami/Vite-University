import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '@axios'

function Overview() {
    const navigate = useNavigate()
    const [pendingRecords, setPendingRecords] = useState([])
    const [finalApprovalRecords, setFinalApprovalRecords] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        axios
            .get('/sales')
            .then((res) => {
                const filteredPending = res.data.filter(
                    (sale) => !(sale.accountsApproval && sale.designerApproval) // Include only if at least one is false
                )
                setPendingRecords(filteredPending)
            })
            .catch((err) => {
                console.log(err)
                setError('Failed to fetch pending records.')
            })

        axios
            .get('/sales/finalApprovals')
            .then((res) => {
                setFinalApprovalRecords(res.data)
            })
            .catch((err) => {
                console.log(err)
                setError('Failed to fetch final approval records.')
            })
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 p-4 text-white shadow-lg">
            {error && <div className="mb-4 text-red-500">{error}</div>}

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <button
                    onClick={() => navigate('../testCreate/sales')}
                    className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-green-600"
                >
                    Create New Entry
                </button>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium">
                    Total Approvals in Queue: {pendingRecords.length}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {pendingRecords.length > 0 ? (
                        pendingRecords.map((sale) => (
                            <div
                                key={sale._id}
                                className="rounded-lg bg-gray-800 p-4 shadow-md"
                            >
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="font-semibold">
                                        GST Number:
                                    </div>
                                    <div>{sale.gstNumber}</div>

                                    <div className="font-semibold">
                                        Brand Name:
                                    </div>
                                    <div>{sale.brandName}</div>

                                    <div className="font-semibold">
                                        Designer Approval:
                                    </div>
                                    <div
                                        className={
                                            sale.designerApproval
                                                ? 'text-green-400'
                                                : 'text-red-400'
                                        }
                                    >
                                        {sale.designerApproval
                                            ? 'Approved'
                                            : 'Not Approved'}
                                    </div>

                                    <div className="font-semibold">
                                        Accounts Approval:
                                    </div>
                                    <div
                                        className={
                                            sale.accountsApproval
                                                ? 'text-green-400'
                                                : 'text-red-400'
                                        }
                                    >
                                        {sale.accountsApproval
                                            ? 'Approved'
                                            : 'Not Approved'}
                                    </div>

                                    <div className="font-semibold">
                                        Time Created:
                                    </div>
                                    <div>
                                        {new Date(
                                            sale.createdAt
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No pending approvals.</p>
                    )}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-medium">
                    Final Approvals Needed: {finalApprovalRecords.length}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {finalApprovalRecords.length > 0 ? (
                        finalApprovalRecords.map((sale) => (
                            <div
                                key={sale._id}
                                className="rounded-lg bg-green-600 p-4 text-black shadow-md"
                            >
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="font-semibold">
                                        Brand Name:
                                    </div>
                                    <div>{sale.brandName}</div>

                                    <div className="font-semibold">
                                        GST Number:
                                    </div>
                                    <div>{sale.gstNumber}</div>

                                    <div className="font-semibold">
                                        MD Approval:
                                    </div>
                                    <button className="rounded-lg bg-yellow-500 px-3 py-1 text-xs font-semibold text-black shadow-md transition-all hover:bg-yellow-600">
                                        Required
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">
                            No final approvals needed.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Overview
