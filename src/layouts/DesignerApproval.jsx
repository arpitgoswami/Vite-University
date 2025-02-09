import { useEffect, useState } from 'react'
import { handleDeleteCookie } from '../utils/cookieUtils'
import { Dialog } from '@headlessui/react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

import { RiLogoutCircleLine } from 'react-icons/ri'
import { IoIosWarning } from 'react-icons/io'

import Loading from '@loading'
import axios from '@axios'

function DesignerApproval() {
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const username = localStorage.username

    useEffect(() => {
        axios
            .get('/sales')
            .then((res) => {
                setRecords(
                    res.data.filter((record) => !record.designerApproval)
                )
                setLoading(false)
            })
            .catch((err) => console.error(err))
    }, [])

    function handleApproval() {
        axios
            .put(`/sales/approve/designer/${selectedId}`)
            .then(() => {
                toast.success('Successfully Approved!')
                setRecords(
                    records.filter((record) => record._id !== selectedId)
                )
                setIsOpen(false)
            })
            .catch((err) => console.log(err))
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-[100vh] bg-primary">
            <Toaster />
            <div className="flex items-center justify-between bg-neutral p-4 text-white">
                <div>Designer Approval</div>
                <button
                    className="btn btn-error"
                    onClick={() => {
                        handleDeleteCookie(username)
                    }}
                >
                    <RiLogoutCircleLine size="20" />
                    Logout
                </button>
            </div>

            <div className="p-4">
                {records.length > 0 ? (
                    <div className="space-y-4">
                        {records.map((data) => (
                            <div
                                key={data._id}
                                className="rounded-lg bg-neutral p-4 text-white shadow-md"
                            >
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="font-semibold">
                                        GST Number:
                                    </div>
                                    <div>{data.gstNumber}</div>

                                    <div className="font-semibold">
                                        Company Name:
                                    </div>
                                    <div>{data.companyName}</div>

                                    <div className="font-semibold">
                                        Designer Approval:
                                    </div>
                                    <div className="font-semibold">Pending</div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedId(data._id)
                                        setIsOpen(true)
                                    }}
                                    className="btn btn-success btn-sm mt-4"
                                >
                                    Approve
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 text-center text-white">
                        No approvals currently ..
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-neutral bg-opacity-60"
            >
                <div className="rounded bg-white shadow-lg">
                    <Dialog.Title className="flex items-center rounded-t bg-yellow-500 p-4 text-lg font-bold">
                        <IoIosWarning size={30} />
                        <div className="ml-1">Confirm Approval</div>
                    </Dialog.Title>
                    <div className="p-4">
                        <Dialog.Description className="mt-2">
                            Are you sure you want to approve this entry?
                        </Dialog.Description>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="btn btn-error btn-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApproval}
                                className="btn btn-success btn-sm"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default DesignerApproval
