import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'

import { AiOutlineSearch } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdDelete, MdCreate } from 'react-icons/md'

import axios from '@axios'
import Loading from '@loading'

function Employees() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [viewingEmployee, setViewingEmployee] = useState(null)

    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [editingId, setEditingId] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        authorization: '',
        joiningDate: '',
    })

    useEffect(() => {
        axios
            .get('employees')
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err.message))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingId) {
            axios
                .put(`employees/${editingId}`, formData)
                .then(() => {
                    toast.success('Employee updated successfully.', {
                        onClose: () => {
                            window.location.reload()
                        },
                        autoClose: 1000,
                    })
                })
                .catch((err) => console.log(err.message))
        } else {
            axios
                .post('employees', formData)
                .then((res) => {
                    toast.success('Employee added successfully.', {
                        onClose: () => {
                            window.location.reload()
                        },
                        autoClose: 1000,
                    })
                })
                .catch((err) => console.log(err.message))
        }
    }

    const handleDelete = () => {
        axios
            .delete(`employees/${deletingId}`)
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

    const filteredData = data.filter((employee) => {
        const matchesSearch = employee.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        if (statusFilter === 'all') return matchesSearch
        return (
            matchesSearch &&
            employee.status.toLowerCase() === statusFilter.toLowerCase()
        )
    })

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">
                        Employees
                    </h1>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <MdCreate />
                        Add New Employee
                    </button>
                </div>

                <div className="mb-6 rounded bg-white p-6 shadow-lg">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full pl-10"
                            />
                            <AiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-gray-600">
                            Total Employees:{' '}
                            <span className="font-semibold text-gray-900">
                                {data.length}
                            </span>
                        </div>
                        <div className="join">
                            <button
                                className={`btn join-item btn-sm ${statusFilter === 'all' ? 'btn-active' : ''}`}
                                onClick={() => setStatusFilter('all')}
                            >
                                All
                            </button>
                            <button
                                className={`btn join-item btn-sm ${statusFilter === 'active' ? 'btn-active' : ''}`}
                                onClick={() => setStatusFilter('active')}
                            >
                                Active
                            </button>
                            <button
                                className={`btn join-item btn-sm ${statusFilter === 'inactive' ? 'btn-active' : ''}`}
                                onClick={() => setStatusFilter('inactive')}
                            >
                                Inactive
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((record, index) => (
                                <div
                                    key={record.id}
                                    className="group relative rounded border border-gray-200 bg-white p-6 shadow-lg transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                                >
                                    <div className="flex h-full flex-col">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    {record.username
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {record.username
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            record.username.slice(
                                                                1
                                                            )}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Employee #{index + 1}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                                                    record.status === 'Active'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-red-100 text-red-600'
                                                }`}
                                            >
                                                {record.status}
                                            </span>
                                        </div>

                                        <div className="flex-grow space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-500">
                                                    Role:
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    {record.designation}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-500">
                                                    Access Level:
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    {record.authorization
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        record.authorization.slice(
                                                            1
                                                        )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-2 border-t pt-4">
                                            <button
                                                className="btn btn-outline btn-primary btn-sm"
                                                onClick={() => {
                                                    setViewingEmployee(record)
                                                    setIsViewModalOpen(true)
                                                }}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-outline btn-primary btn-sm"
                                                onClick={() => {
                                                    setFormData(record)
                                                    setEditingId(record._id)
                                                    setIsModalOpen(true)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline btn-error btn-sm"
                                                onClick={() => {
                                                    setDeletingId(record._id)
                                                    setIsDeleteModalOpen(true)
                                                }}
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <HiOutlineClipboardList className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                                <h3 className="font-medium text-gray-900">
                                    No Employees found
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Try adjusting your search or create a new
                                    employee
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            >
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl">
                    <Dialog.Title className="flex items-center gap-2 rounded-t-lg bg-primary/10 p-6 text-xl font-semibold text-primary">
                        <MdCreate className="h-6 w-6" />
                        {editingId ? 'Edit Employee' : 'Create Employee'}
                    </Dialog.Title>
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="input input-bordered w-full"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    <select
                                        className="select select-bordered w-full"
                                        value={formData.authorization}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                authorization: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            Select Authorization
                                        </option>
                                        <option value="admin">Admin</option>
                                        <option value="designer">
                                            Designer
                                        </option>
                                        <option value="accounts">
                                            Accounts
                                        </option>
                                        <option value="user">User</option>
                                    </select>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                        value={
                                            formData.joiningDate?.split('T')[0]
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                joiningDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4 border-t bg-gray-50 p-4">
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => {
                                            setIsModalOpen(false)
                                            setEditingId(null)
                                            setFormData({
                                                username: '',
                                                password: '',
                                                authorization: '',
                                                joiningDate: '',
                                            })
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-sm text-white"
                                    >
                                        {editingId
                                            ? 'Update Employee'
                                            : 'Create Employee'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>

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
                                onClick={() => {
                                    setIsDeleteModalOpen(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-error btn-sm text-white"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            >
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative w-full max-w-2xl rounded bg-white shadow-2xl">
                    <Dialog.Title className="flex items-center gap-2 rounded-t-lg bg-primary/10 p-6 text-xl font-semibold text-primary">
                        <HiOutlineClipboardList className="h-6 w-6" />
                        Employee Details
                    </Dialog.Title>
                    <div className="p-6">
                        {viewingEmployee && (
                            <div className="space-y-6">
                                <div className="flex items-start justify-between border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                                            {viewingEmployee.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {viewingEmployee.username
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    viewingEmployee.username.slice(
                                                        1
                                                    )}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-500">
                                                {viewingEmployee.designation}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded px-3 py-1 text-sm font-medium ${
                                            viewingEmployee.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {viewingEmployee.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Authorization
                                        </p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {viewingEmployee.authorization
                                                .charAt(0)
                                                .toUpperCase() +
                                                viewingEmployee.authorization.slice(
                                                    1
                                                )}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Joining Date
                                        </p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {new Date(
                                                viewingEmployee.joiningDate
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="mt-8 flex justify-end border-t pt-4">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm text-white"
                                onClick={() => {
                                    setIsViewModalOpen(false)
                                    setViewingEmployee(null)
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Employees
