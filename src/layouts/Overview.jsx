import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Toaster } from 'react-hot-toast'
import { handleDelete } from '../utils/cookieUtils'

import { MdDelete } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'

import Loading from '@loading'
import axios from '@axios'

function Overview() {
    const navigate = useNavigate()
    const [isloading, setLoading] = useState(true)

    const [pendingRecords, setPendingRecords] = useState([])
    const [finalApprovalRecords, setFinalApprovalRecords] = useState([])
    const [error, setError] = useState(null)

    const [deleteId, setDeleteId] = useState('')
    const [approveId, setApproveId] = useState('')

    const [showDialog, setShowDialog] = useState(false)
    const [showApproval, setShowApproval] = useState(false)

    useEffect(() => {
        axios
            .get('/sales')
            .then((res) => {
                const filteredPending = res.data.filter(
                    (sale) =>
                        !(sale.accountsApproval && sale.designerApproval) &&
                        sale.approvedBy !== 'Nil'
                )
                setPendingRecords(filteredPending)
                setLoading(false)
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

    if (isloading) {
        return <Loading />
    }

    const finalApproval = (id) => {
        axios
            .put(`/sales/approve/final/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        window.location.reload()
    }

    return (
        <div className="min-h-screen bg-neutral p-4 text-white shadow-lg">
            <Toaster />
            {error && <div className="mb-4 text-red-500">{error}</div>}

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Overview</h2>
                <button
                    onClick={() => navigate('../createSales')}
                    className="btn btn-outline btn-primary btn-sm"
                >
                    Create New Entry
                </button>
            </div>

            <div className="mb-4 mt-8">
                <h3 className="text-md font-medium">
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
                                        First Approval By:
                                    </div>
                                    <div className="w-max rounded bg-primary px-2">
                                        {sale.approvedBy}
                                    </div>

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
                                <div className="mt-3 flex space-x-2">
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => {
                                            window.location.href = `../invoice/${sale._id}/sales`
                                        }}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => {
                                            window.location.href = `../testUpdate/${sale._id}?doc=sales`
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-error btn-xs"
                                        onClick={() => {
                                            setDeleteId(sale._id)
                                            setShowDialog(true)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No pending approvals.</p>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-md mb-4 font-medium">
                    Final MD Pending Records: {finalApprovalRecords.length}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {finalApprovalRecords.length > 0 ? (
                        finalApprovalRecords.map((sale) => (
                            <div
                                key={sale._id}
                                className="rounded-lg bg-gray-800 p-4 text-white shadow-md"
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
                                        Comment:
                                    </div>
                                    <div>{sale.comments}</div>
                                </div>
                                <div className="mt-3 flex space-x-2">
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => {
                                            window.location.href = `../invoice/${sale._id}/sales`
                                        }}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => {
                                            setApproveId(sale._id)
                                            setShowApproval(true)
                                        }}
                                    >
                                        Final Approve
                                    </button>
                                    <button
                                        className="btn btn-error btn-xs"
                                        onClick={() => {
                                            setDeleteId(sale._id)
                                            setShowDialog(true)
                                        }}
                                    >
                                        Delete
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

            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 shadow-lg"
            >
                <div className="rounded bg-white shadow-lg">
                    <Dialog.Title className="flex items-center rounded-t bg-error p-4 text-lg font-bold text-neutral">
                        <MdDelete size={30} />
                        <div className="ml-1"> Confirm Delete</div>
                    </Dialog.Title>
                    <div className="p-4">
                        <Dialog.Description className="text-neutral">
                            Are you sure you want to delete this record?
                        </Dialog.Description>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="btn btn-error btn-sm"
                                onClick={() => {
                                    handleDelete('sales', deleteId)
                                    setShowDialog(false)
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={showApproval}
                onClose={() => setShowApproval(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 shadow-lg"
            >
                <div className="rounded bg-white shadow-lg">
                    <Dialog.Title className="flex items-center rounded-t bg-success p-4 text-lg font-bold text-neutral">
                        <TiTick size={30} />
                        <div className="ml-1"> Confirm Approval</div>
                    </Dialog.Title>
                    <div className="p-4">
                        <Dialog.Description className="text-neutral">
                            Are you sure you want to finally approve this
                            record?
                        </Dialog.Description>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => finalApproval(approveId)}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setShowApproval(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Overview
