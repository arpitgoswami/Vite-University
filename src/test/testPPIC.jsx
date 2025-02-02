import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import Loading from '../components/Loading'

import axios from '@axios'

const TestPPIC = () => {
    const { doc } = useParams()
    const [inputValues, setInputValues] = useState({})
    const [fields, setFields] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get(`${doc}`)
                if (response.data && response.data.length > 0) {
                    const firstRecord = response.data[0]
                    const fetchedFields = Object.keys(firstRecord)
                    setFields(fetchedFields)
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching fields:', error)
                toast.error('Failed to fetch fields.')
                setLoading(false)
            }
        }

        fetchFields()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${doc}`, inputValues)
            toast.success('Data created successfully!', {
                autoClose: 1000,
                onClose: () => navigate(-1),
            })
            console.log('Created data:', response.data)
        } catch (error) {
            console.error('Error creating data:', error)
            toast.error('Failed to create data.', {
                autoClose: 2000,
            })
        }
    }

    const handleBack = () => {
        navigate(-1)
    }

    if (loading) {
        return <Loading />
    }

    const foilFields = fields.filter((field) =>
        field.toLowerCase().includes('foil')
    )
    const cartonFields = fields.filter((field) =>
        field.toLowerCase().includes('carton')
    )
    const otherFields = fields.filter(
        (field) =>
            !field.toLowerCase().includes('foil') &&
            !field.toLowerCase().includes('carton') &&
            field !== '_id'
    )

    const renderField = (field) => {
        const isDateField = field.toLowerCase().includes('date')
        return (
            <div key={field}>
                <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-900"
                >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                    type={isDateField ? 'date' : 'text'}
                    id={field}
                    name={field}
                    value={inputValues[field] || ''}
                    onChange={handleChange}
                    placeholder={
                        isDateField ? 'Select a date' : `Enter ${field}`
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-600"
                />
            </div>
        )
    }

    return (
        <div className="flex justify-center p-6">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
                <div className="mb-6 flex justify-center">
                    <img
                        src="/logo.jpg"
                        alt="Logo"
                        className="mb-8 w-[20rem]"
                    />
                </div>

                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                    Create New Entry
                </h2>

                <hr className="mb-4 border-gray-300" />

                <form onSubmit={handleSubmit}>
                    {/* Foil Fields */}
                    {foilFields.length > 0 && (
                        <>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                Foil Fields
                            </h3>
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                {foilFields.map(renderField)}
                            </div>
                            <hr className="mb-4 border-gray-300" />
                        </>
                    )}

                    {/* Carton Fields */}
                    {cartonFields.length > 0 && (
                        <>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                Carton Fields
                            </h3>
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                {cartonFields.map(renderField)}
                            </div>
                            <hr className="mb-4 border-gray-300" />
                        </>
                    )}

                    {/* Other Fields */}
                    {otherFields.length > 0 && (
                        <>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                Other Fields
                            </h3>
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                {otherFields.map(renderField)}
                            </div>
                        </>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center justify-center rounded-md bg-gray-600 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                            Back
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default TestPPIC
