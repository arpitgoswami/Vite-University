import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { handleDelete } from '../utils/cookieUtils'
import { Dialog } from '@headlessui/react'

import { MdDelete } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'

import Loading from '@loading'
import axios from '@axios'

function RMQuaratine() {
    const [pendingRecords, setPendingRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [deleteId, setDeleteId] = useState(null)
    const [approveId, setApproveId] = useState('')

    const [showDialog, setShowDialog] = useState(false)
    const [showApproval, setShowApproval] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get('/sales')
            .then((res) => {
                const filteredPending = res.data.filter(
                    (sale) => sale.approvedBy === 'Nil'
                )
                setPendingRecords(filteredPending)
                console.log(pendingRecords)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setError('Failed to fetch pending records.')
                setLoading(false)
            })
    }, [])

    const finalApproval = (id) => {
        const role = localStorage.getItem('role')
        axios
            .put(`/sales/approve/${id}`, { approvedBy: role })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        window.location.reload()
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="flex justify-between">
                    <div className="text-xl font-bold">
                        RM Qurantine Records
                    </div>
                    <div>
                        <button
                            className="btn btn-outline btn-primary btn-sm"
                            onClick={() => navigate('../testCreate/sales')}
                        >
                            Add New Record
                        </button>
                    </div>
                </div>

                <hr className="my-4" />

                <div>
                    <div className="my-4 mt-4 font-medium">
                        Total RM Quaratine Records:{' '}
                        {
                            pendingRecords.filter((record) =>
                                record.gstNumber
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            ).length
                        }
                    </div>
                    <div className="my-4">
                        <input
                            type="text"
                            placeholder="Search by GST Number"
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {pendingRecords.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                            {pendingRecords
                                .filter((record) =>
                                    record.gstNumber
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((record, index) => (
                                    <div
                                        key={index}
                                        className="rounded bg-white p-4 shadow-lg"
                                    >
                                        <div className="grid grid-cols-2 gap-y-1 text-sm">
                                            <p className="font-semibold">
                                                GST Number:
                                            </p>
                                            <p>{record.gstNumber}</p>
                                            <p className="font-semibold">
                                                Company Name:
                                            </p>
                                            <p>{record.companyName}</p>
                                            <p className="font-semibold">
                                                Brand Name:
                                            </p>
                                            <p>{record.brandName}</p>
                                        </div>
                                        <div className="mt-2 flex gap-2">
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
                                                className="btn btn-primary btn-xs"
                                                onClick={() => {
                                                    setApproveId(record._id)
                                                    setShowApproval(true)
                                                }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() => {
                                                    setDeleteId(record._id)
                                                    setShowDialog(true)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No pending approvals.</p>
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
        </>
    )
}

export default RMQuaratine
