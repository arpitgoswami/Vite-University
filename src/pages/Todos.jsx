import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'

import { AiOutlineSearch } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import { MdCreate } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'

import axios from '@axios'
import Loading from '@loading'

function Todos() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const [showDialog, setShowDialog] = useState(false)
    const [showApproval, setShowApproval] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [approveId, setApproveId] = useState(null)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [newTodoTitle, setNewTodoTitle] = useState('')

    const username = localStorage.getItem('username')

    useEffect(() => {
        axios
            .get('todos')
            .then((res) => {
                setData(
                    res.data.filter((record) => record.username === username)
                )
                setLoading(false)
            })
            .catch((err) => console.log(err.message))
    }, [])

    const handleDelete = () => {
        axios.delete(`todos/${deleteId}`).then((res) => {
            toast.success('Todo deleted successfully.', {
                onClose: () => {
                    window.location.reload()
                },
                autoClose: 1000,
            })
        })
    }

    const finalApproval = () => {
        axios.put(`todos/${approveId}`).then((res) => {
            toast.success('Todo approved successfully.', {
                onClose: () => {
                    window.location.reload()
                },
                autoClose: 1000,
            })
        })
    }

    const handleCreate = () => {
        axios
            .post('todos', {
                title: newTodoTitle,
                username: username,
            })
            .then((res) => {
                toast.success('Todo created successfully.', {
                    onClose: () => {
                        window.location.reload()
                    },
                    autoClose: 1000,
                })
            })
            .catch((err) => console.log(err.message))
    }

    const filteredData = data.filter((todo) => {
        const matchesSearch = todo.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        if (statusFilter === 'all') return matchesSearch
        if (statusFilter === 'completed') return matchesSearch && todo.completed
        if (statusFilter === 'pending') return matchesSearch && !todo.completed
        return matchesSearch
    })

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Todos</h1>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowCreateDialog(true)}
                    >
                        <MdCreate />
                        Create New Todo
                    </button>
                </div>

                <div className="mb-6 rounded bg-white p-6 shadow-lg">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search todos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full pl-10"
                            />
                            <AiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-gray-600">
                            Total Todos:{' '}
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
                                className={`btn join-item btn-sm ${statusFilter === 'pending' ? 'btn-active' : ''}`}
                                onClick={() => setStatusFilter('pending')}
                            >
                                Pending
                            </button>
                            <button
                                className={`btn join-item btn-sm ${statusFilter === 'completed' ? 'btn-active' : ''}`}
                                onClick={() => setStatusFilter('completed')}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((record, index) => (
                                <div
                                    key={index}
                                    className="rounded border border-gray-200 bg-white p-5 transition-shadow duration-200 hover:shadow-md"
                                >
                                    <div className="flex h-full flex-col">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                Todo #{index + 1}
                                            </span>
                                            <span
                                                className={`rounded px-2 py-1 text-xs ${
                                                    record.completed
                                                        ? 'bg-green-200 text-green-800'
                                                        : 'bg-yellow-200 text-yellow-800'
                                                }`}
                                            >
                                                {record.completed
                                                    ? 'Completed'
                                                    : 'Pending'}
                                            </span>
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">
                                                {record.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    record.createdAt
                                                ).toLocaleString('en-US', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex space-x-2 border-t pt-4">
                                            {record.completed ? null : (
                                                <button
                                                    className="btn btn-primary btn-sm flex-1"
                                                    onClick={() => {
                                                        setApproveId(record._id)
                                                        setShowApproval(true)
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-square btn-error btn-sm"
                                                onClick={() => {
                                                    setDeleteId(record._id)
                                                    setShowDialog(true)
                                                }}
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <HiOutlineClipboardList className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                                <h3 className="font-medium text-gray-900">
                                    No Todos found
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Try adjusting your search or create a new
                                    todo
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog
                open={showCreateDialog}
                onClose={() => setShowCreateDialog(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative w-full max-w-md rounded bg-white shadow-2xl">
                    <Dialog.Title className="flex items-center gap-2 rounded-t-lg bg-primary/10 p-6 text-lg font-semibold text-primary">
                        <MdCreate className="h-6 w-6" />
                        Create New Todo
                    </Dialog.Title>
                    <div className="p-6">
                        <input
                            type="text"
                            placeholder="Enter todo title..."
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                            className="input input-bordered mb-6 w-full"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                    setShowCreateDialog(false)
                                    setNewTodoTitle('')
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary btn-sm text-white"
                                onClick={handleCreate}
                                disabled={!newTodoTitle.trim()}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
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
                        <Dialog.Description className="text-base text-gray-600">
                            Are you sure you want to delete this Todo? This
                            action cannot be undone.
                        </Dialog.Description>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error btn-sm text-white"
                                onClick={() => {
                                    handleDelete()
                                    setShowDialog(false)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={showApproval}
                onClose={() => setShowApproval(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="relative w-full max-w-md rounded bg-white shadow-2xl">
                    <Dialog.Title className="flex items-center gap-2 rounded-t-lg bg-success/10 p-6 text-lg font-semibold text-success">
                        <TiTick className="h-6 w-6" />
                        Confirm Approval
                    </Dialog.Title>
                    <div className="p-6">
                        <Dialog.Description className="text-base text-gray-600">
                            Are you sure you want to approve this record? This
                            will mark the todo as completed.
                        </Dialog.Description>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setShowApproval(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-success btn-sm text-white"
                                onClick={() => finalApproval()}
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Todos
