import React from 'react'
import { useNavigate } from 'react-router-dom'

function ApprovalCard({ data }) {
    const navigate = useNavigate()
    return (
        <div
            className="da my-2 flex cursor-pointer justify-between rounded-lg border border-gray-300 bg-green-100 p-2 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
            onClick={() =>
                navigate(
                    `/approval/${data['SALES ID']}?doc=sales&sales_id=${data._id}`
                )
            }
        >
            <div className="space-y-2">
                <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-600">GST Number:</span>
                    <span className="font-medium text-gray-800">
                        {data['GST NUMBER']}
                    </span>
                </div>
                <span className="btn btn-warning btn-xs">{data['STATUS']}</span>
            </div>
        </div>
    )
}

function SalesCard({ data }) {
    const navigate = useNavigate()
    return (
        <>
            {' '}
            <div
                className="my-2 flex cursor-pointer justify-between rounded-lg border border-gray-300 bg-green-100 p-2 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
                onClick={() =>
                    navigate(`/testUpdate/${data._id}?doc=${'sales'}`)
                }
            >
                {data['GST NUMBER']}
                {data['COMPANY NAME']}
            </div>
        </>
    )
}

function PPICCard({ data }) {
    const navigate = useNavigate()

    const displayKeys = [
        'PO NUMBER',
        'PO DATE',
        'DISPATCH DATE',
        'BRAND NAME',
        'PARTY NAME',
        'BATCH NUMBER',
    ]

    return (
        <div
            className="my-2 flex cursor-pointer justify-between rounded-lg border border-gray-300 bg-green-100 p-2 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
            onClick={() => navigate(`/testUpdatePPIC/${data._id}?doc=ppic`)}
        >
            <div className="grid grid-cols-3 gap-2">
                {displayKeys.map((key) => (
                    <div key={key} className="flex flex-col">
                        <span className="font-medium">{key}:</span>
                        <span className="text-sm text-gray-700">
                            {data[key] || 'N/A'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { ApprovalCard, SalesCard, PPICCard }
