import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'

import Loading from '../Loading'

import axios from '@axios'

const Approval = () => {
    const [formData, setFormData] = useState(null)
    const [statusInput, setStatusInput] = useState('')
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const { id } = useParams()
    const doc = params.get('doc')
    const sales_id = params.get('sales_id')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${doc}/${id}`)
                setFormData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [id, doc])

    const handleBack = () => {
        navigate(-1)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('/status/updateById', {
                id: sales_id,
                status: statusInput + ' by ' + 'Admin',
            })
            toast.success('Status updated successfully!', {
                autoClose: 2000,
            })
            setTimeout(() => {
                navigate(-1)
            }, 2000)
        } catch (error) {
            toast.error('Failed to update status.')
        }
    }

    if (!formData) {
        return (
            <>
                <Loading />
            </>
        )
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <div className="my-8 h-auto w-[60vw] rounded-xl bg-gray-800 p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-white">
                    Approval
                </h2>

                <div className="mb-6 grid grid-cols-2 gap-4">
                    {Object.keys(formData).map(
                        (key) =>
                            key !== '_id' && (
                                <div
                                    key={key}
                                    className="flex items-center justify-between text-white"
                                >
                                    <div className="font-medium capitalize">
                                        {key.replace(/_/g, ' ')}
                                    </div>
                                    <div className="text-gray-400">
                                        {formData[key] || '-'}
                                    </div>
                                </div>
                            )
                    )}
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-white">
                            Sales ID
                        </label>
                        <input
                            type="text"
                            value={sales_id}
                            readOnly
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-white">
                            Status
                        </label>
                        <select
                            value={statusInput}
                            onChange={(e) => setStatusInput(e.target.value)}
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
                        >
                            <option value="Approved">Approved</option>
                            <option value="Disapproved">Disapproved</option>
                        </select>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full rounded-md bg-gray-200 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Update Status
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Approval
