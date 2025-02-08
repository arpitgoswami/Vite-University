import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '@axios'

function Overview() {
    const navigate = useNavigate()
    const [pendingCount, setPendingCount] = useState(0)
    const [pendingRecords, setPendingRecords] = useState([])
    const [finalApprovalCount, setFinalApprovalCount] = useState(0)
    const [finalApprovalRecords, setFinalApprovalRecords] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        axios
            .get('/sales')
            .then((res) => {
                setPendingCount(res.data.length)
                setPendingRecords(res.data)
            })
            .catch((err) => {
                console.log(err)
                setError('Failed to fetch pending records.')
            })

        axios
            .get('/sales/finalApprovals')
            .then((res) => {
                setFinalApprovalCount(res.data.length)
                setFinalApprovalRecords(res.data)
            })
            .catch((err) => {
                console.log(err)
                setError('Failed to fetch final approval records.')
            })
    }, [])

    return (
        <>
            <div className="m-2">
                {error && <div className="text-red-500">{error}</div>}
                <div className="flex items-center space-x-4">
                    <div>Total Approvals in Queue: {pendingCount}</div>
                    <button
                        onClick={() => {
                            navigate('../testCreate/sales')
                        }}
                        className="btn btn-success"
                    >
                        Create New Entry
                    </button>
                </div>
                <div className="my-2 grid grid-cols-4 gap-2">
                    {pendingRecords.length > 0 ? (
                        pendingRecords.map((sale, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-zinc-800 text-xs text-white"
                            >
                                <div className="grid grid-cols-2 p-2">
                                    <div>GST Number</div>
                                    <div>{sale.gstNumber}</div>

                                    <div>Brand Name</div>
                                    <div>{sale.brandName}</div>

                                    <div>Designer Approval</div>
                                    <div>
                                        {sale.designerApproval
                                            ? 'Approved'
                                            : 'Not Approved'}
                                    </div>

                                    <div>Accounts Approval</div>
                                    <div>
                                        {sale.accountsApproval
                                            ? 'Approved'
                                            : 'Not Approved'}
                                    </div>

                                    <div>Time Created</div>
                                    <div>{sale.createdAt}</div>

                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() =>
                                            navigate(
                                                `/approval/${sale['SALES ID']}?doc=sales&sales_id=${sale._id}`
                                            )
                                        }
                                    >
                                        Approve Now
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No Approvals ..</p>
                        </div>
                    )}
                </div>

                <div>
                    <div>Final Approvals Needed: {finalApprovalCount}</div>
                    <div className="grid grid-cols-4">
                        {finalApprovalRecords.length > 0 &&
                            finalApprovalRecords.map((sale, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 rounded-lg bg-green-400 p-2 text-sm"
                                >
                                    <div>{sale.brandName}</div>
                                    <div>{sale.gstNumber}</div>
                                    <div>MD Approval</div>
                                    <button className="btn btn-primary btn-warning btn-xs">
                                        Approve
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview
