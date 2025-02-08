import { useEffect, useState } from 'react'

import { RiLogoutCircleLine } from 'react-icons/ri'
import { ToastContainer } from 'react-toastify'
import { handleDeleteCookie } from '../utils/cookieUtils'

import axios from '@axios'

function DesignerApproval() {
    const [records, setRecords] = useState([])
    const username = localStorage.username

    useEffect(() => {
        axios
            .get('/sales')
            .then((res) =>
                setRecords(
                    res.data.filter((record) => !record.designerApproval)
                )
            )
            .catch((err) => console.error(err))
    }, [])

    function handleApproval(selectedId) {
        axios
            .put(`/sales/approve/designer/${selectedId}`)
            .then(() => {
                alert('Approval successful')
                setRecords(
                    records.filter((record) => record._id !== selectedId)
                )
            })
            .catch((err) => alert(`Error: ${err.message}`))
    }

    return (
        <div className="min-h-[100vh] bg-primary">
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
                <div className="space-y-4">
                    {records.map((data) => (
                        <div
                            key={data._id}
                            className="rounded-lg bg-neutral p-4 text-white shadow-md"
                        >
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="font-semibold">GST Number:</div>
                                <div>{data.gstNumber}</div>

                                <div className="font-semibold">
                                    Company Name:
                                </div>
                                <div>{data.companyName}</div>

                                <div className="font-semibold">
                                    Designer Approval:
                                </div>
                                <div className="">Pending</div>
                            </div>
                            <div
                                onClick={() => handleApproval(data._id)}
                                className="btn btn-success btn-sm mt-2"
                            >
                                Approve
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DesignerApproval
