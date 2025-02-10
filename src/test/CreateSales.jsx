import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import { IoMdArrowRoundBack } from 'react-icons/io'

import axios from '@axios'

function CreateSales() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        gstNumber: '',
        dlNumber: '',
        brandName: '',
        composition: '',
        repeatOrder: '',
        packing: '',
        typeOfPacking: '',
        specialRequirement: '',
        section: '',
        quantity: '',
        mrp: '',
        rate: '',
        cyc: '',
        advance: '',
        gst: '',
        companyName: '',
        companyAddress: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const formatFieldLabel = (key) => {
        const capitalizedFields = ['gst', 'cyc', 'mrp']
        if (key === 'gstNumber') return 'GST Number'
        if (key === 'dlNumber') return 'DL Number'
        if (capitalizedFields.includes(key.toLowerCase())) {
            return key.toUpperCase()
        }
        return key.replace(/([A-Z])/g, ' $1').trim()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/sales', formData)
            toast.success(response.data.message)
            setTimeout(() => {
                navigate('/dashboard/overview')
            }, 2000)
        } catch (error) {
            toast.error(
                'Error: ' + (error.response?.data?.message || error.message)
            )
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral p-6">
            <Toaster position="top-right" />
            <div className="mx-auto w-full max-w-5xl rounded-xl bg-white shadow-xl">
                <div className="mt-8 flex items-center justify-between px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost"
                    >
                        <IoMdArrowRoundBack className="h-5 w-5" />
                        Back
                    </button>
                    <img
                        src="/logo.jpg"
                        className="w-80 object-contain"
                        alt="Company Logo"
                    />
                    <button
                        onClick={() => navigate('/dashboard/overview')}
                        className="btn btn-ghost"
                    >
                        Home
                    </button>
                </div>

                <h2 className="mb-2 mt-6 text-center text-lg font-bold text-gray-800">
                    Create New Sales Record
                </h2>
                <hr />
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 grid grid-cols-1 gap-y-6 md:grid-cols-2"
                >
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="group px-6">
                            <label className="mb-2 block text-sm font-semibold capitalize text-gray-700">
                                {formatFieldLabel(key)}
                            </label>
                            <input
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                placeholder={`Enter ${formatFieldLabel(key).toLowerCase()}`}
                                className="input input-bordered w-full rounded-lg border-gray-300 px-4 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                required
                            />
                        </div>
                    ))}

                    <div className="col-span-full flex justify-center">
                        <button
                            type="submit"
                            className="h-16 w-full rounded-b-xl bg-primary font-bold hover:bg-primary/90"
                        >
                            Submit Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSales
