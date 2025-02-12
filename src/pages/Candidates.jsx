import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'

import { AiOutlineSearch } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdDelete, MdCreate, MdPersonAdd } from 'react-icons/md'

import axios from '@axios'
import Loading from '@loading'

function Candidates() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        highestQualification: '',
        degree: '',
        employmentHistory: '',
        salaryAsked: '',
        phone: '',
        email: '',
        interviewDate: '',
    })

    const [searchQuery, setSearchQuery] = useState('')
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        axios
            .get('candidate')
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err.message))
    }, [])

    const handleSubmit = () => {
        if (deletingId) {
            axios
                .delete(`candidate/${deletingId}`)
                .then(() => {
                    toast.success('Employee deleted successfully.', {
                        onClose: () => {
                            window.location.reload()
                        },
                        autoClose: 1000,
                    })
                })
                .catch((err) => console.log(err.message))
        }
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        axios
            .post('candidate', formData)
            .then(() => {
                toast.success('Candidate added successfully.', {
                    onClose: () => {
                        window.location.reload()
                    },
                    autoClose: 1000,
                })
            })
            .catch((err) => console.log(err.message))
    }

    const handleRowClick = (record) => {
        setSelectedCandidate(record)
        setIsViewModalOpen(true)
    }

    const filteredData = data.filter((employee) => {
        return employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">
                        Potential Candidates
                    </h1>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <MdPersonAdd size={20} />
                        Add New Candidate
                    </button>
                </div>

                <div className="mb-6 rounded bg-white p-6 shadow-lg">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search candidates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full pl-10"
                            />
                            <AiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-gray-600">
                            Total Potential Candidates:{' '}
                            <span className="font-semibold text-gray-900">
                                {data.length}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Candidate
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Department
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Qualification
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Experience
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Expected Salary
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Contact
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Interview Date
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredData.length > 0 ? (
                                    filteredData.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() =>
                                                handleRowClick(record)
                                            }
                                        >
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                        {record.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        {record.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                {record.department}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                {record.highestQualification}
                                                <div className="text-xs text-gray-500">
                                                    {record.degree}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                {record.employmentHistory}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                ₹
                                                {record.salaryAsked.toLocaleString()}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                {record.phone}
                                                <div className="text-xs text-gray-500">
                                                    {record.email}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span className="inline-flex items-center rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                                                    {new Date(
                                                        record.interviewDate
                                                    ).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button
                                                    className="btn btn-outline btn-error btn-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setDeletingId(
                                                            record._id
                                                        )
                                                        setIsDeleteModalOpen(
                                                            true
                                                        )
                                                    }}
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-4 py-8 text-center"
                                        >
                                            <HiOutlineClipboardList className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                                            <h3 className="font-medium text-gray-900">
                                                No Candidates found
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Try adjusting your search or
                                                create a new candidate
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Dialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative w-full max-w-md rounded bg-white shadow-2xl">
                    <Dialog.Title className="flex items-center gap-2 rounded-t-lg bg-error/10 p-6 text-lg font-semibold text-error">
                        <MdDelete className="h-6 w-6" />
                        Confirm Delete
                    </Dialog.Title>
                    <div className="p-6">
                        <p className="mb-4 text-gray-600">
                            Are you sure you want to delete this employee? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsDeleteModalOpen(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-error btn-sm text-white"
                                onClick={() => handleSubmit()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
            >
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative my-8 w-full max-w-xl rounded-lg bg-white shadow-2xl ring-1 ring-black/5">
                    <Dialog.Title className="flex items-center gap-3 rounded-t-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                        <div className="rounded-full bg-primary/10 p-2">
                            <MdPersonAdd className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add New Candidate
                        </h3>
                    </Dialog.Title>
                    <div className="max-h-[calc(100vh-16rem)] overflow-y-auto px-6 py-4">
                        <form
                            onSubmit={handleAddSubmit}
                            className="grid grid-cols-2 gap-x-6 gap-y-4"
                        >
                            <div className="col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Enter candidate's full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.department}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            department: e.target.value,
                                        })
                                    }
                                    placeholder="e.g. Engineering, Sales, HR"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Highest Qualification
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.highestQualification}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            highestQualification:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. Bachelor's, Master's, Ph.D."
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Degree
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.degree}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            degree: e.target.value,
                                        })
                                    }
                                    placeholder="e.g. Computer Science, Business Administration"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Expected Salary
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                                        ₹
                                    </span>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full rounded-l-none"
                                        value={formData.salaryAsked}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                salaryAsked: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Employment History
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    rows={3}
                                    value={formData.employmentHistory}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            employmentHistory: e.target.value,
                                        })
                                    }
                                    placeholder="Brief description of previous work experience and roles"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    className="input input-bordered w-full"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="candidate@example.com"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Interview Date
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.interviewDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            interviewDate: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="sticky bottom-0 flex justify-end gap-3 rounded-b-lg border-t bg-gray-50 px-6 py-4">
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm text-white"
                            onClick={handleAddSubmit}
                        >
                            Add Candidate
                        </button>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
            >
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative my-8 w-full max-w-2xl rounded-lg bg-white shadow-2xl">
                    {selectedCandidate && (
                        <>
                            <Dialog.Title className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                                        {selectedCandidate.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {selectedCandidate.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {selectedCandidate.department}
                                        </p>
                                    </div>
                                </div>
                            </Dialog.Title>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Qualification
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {
                                                    selectedCandidate.highestQualification
                                                }
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {selectedCandidate.degree}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Expected Salary
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                ₹
                                                {selectedCandidate.salaryAsked.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Contact Information
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCandidate.phone}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {selectedCandidate.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Interview Date
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {new Date(
                                                    selectedCandidate.interviewDate
                                                ).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Employment History
                                            </h4>
                                            <p className="mt-1 whitespace-pre-line text-sm text-gray-900">
                                                {
                                                    selectedCandidate.employmentHistory
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 rounded-b-lg border-t bg-gray-50 px-6 py-4">
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setIsViewModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Dialog>
        </div>
    )
}

export default Candidates
