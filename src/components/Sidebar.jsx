import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { readCookie } from '../utils/cookieUtils'
import { handleDeleteCookie } from '../utils/cookieUtils'

import axios from '@axios'

import { HiMiniBars3 } from 'react-icons/hi2'
import { IoCloseOutline } from 'react-icons/io5'

import { FaTable } from 'react-icons/fa'
import { BiTask } from 'react-icons/bi'
import { RxDashboard } from 'react-icons/rx'
import { FaShoppingBag } from 'react-icons/fa'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { LuUsersRound } from 'react-icons/lu'
import { CgProfile } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { IoCalendarNumber } from 'react-icons/io5'

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [pendingCount, setPendingCount] = useState(null)
    const [pendingSales, setPendingSales] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    const formatPathname = (pathname) => {
        return pathname.split('/').filter(Boolean).join(' > ')
    }

    const username = readCookie('username')

    const sidebarItems = [
        {
            label: 'Dashboard',
            icon: <RxDashboard size={20} />,
            path: 'overview',
        },
        {
            label: 'Tasks',
            icon: <BiTask size={20} />,
            path: 'tasks',
        },
        {
            label: 'Calendar',
            icon: <IoCalendarNumber size={20} />,
            path: 'calendar',
        },
        {
            label: 'Employees',
            icon: <LuUsersRound size={20} />,
            path: 'employees',
        },
        {
            label: 'Attendance',
            icon: <FaTable size={20} />,
            path: 'attendance',
        },
        {
            label: 'Sales Report',
            icon: <FaShoppingBag size={20} />,
            path: 'sales',
        },
        {
            label: 'PPIC Register',
            icon: <HiOutlineDocumentReport size={20} />,
            path: 'ppic',
        },
        {
            label: 'Notifications',
            icon: <MdOutlineNotificationsActive size={20} />,
            path: 'notification',
        },
        {
            label: 'Profile',
            icon: <CgProfile size={20} />,
            path: 'profile',
        },
        {
            label: 'Logout',
            icon: <BiLogOutCircle size={20} />,
            action: () => {
                handleDeleteCookie(username)
            },
            className: 'btn-error',
        },
    ]

    useEffect(() => {
        const fetchPendingCount = async () => {
            try {
                const response = await axios.get('/status/pending')
                setPendingCount(response.data.pendingCount)
                setPendingSales(response.data.pendingRecords)
            } catch (error) {
                console.error('Error fetching pending count:', error)
            }
        }
        fetchPendingCount()
    }, [])

    return (
        <div className="flex">
            <aside
                className={`fixed z-10 h-screen bg-neutral text-lg text-base-100 transition-all duration-200 ${
                    isCollapsed ? 'w-16' : 'w-64'
                }`}
            >
                <nav className="flex justify-center p-2">
                    <div>
                        <img
                            src="/logo.jpg"
                            className={`${isCollapsed ? 'hidden' : 'mb-2 block h-[3rem] rounded-lg'}`}
                        />
                        <ul className="space-y-2">
                            {sidebarItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        item.path &&
                                        navigate('../dashboard/' + item.path)
                                    }
                                >
                                    <a
                                        className={`cursor-pointer hover:bg-base-100 hover:text-neutral ${
                                            isCollapsed
                                                ? `btn btn-square ${item.className || 'btn-ghost'}`
                                                : 'flex h-12 w-60 items-center space-x-2 rounded-lg px-4 text-sm'
                                        }`}
                                        onClick={item.action}
                                    >
                                        {item.icon}
                                        {!isCollapsed && (
                                            <span>{item.label}</span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </aside>
            <div
                className={`flex-1 bg-gray-300 transition-all duration-200 ${
                    isCollapsed ? 'ml-16' : 'ml-64'
                }`}
            >
                <div className="navbar bg-neutral text-base-100">
                    <div className="navbar-start space-x-2">
                        <div>
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="btn btn-square"
                            >
                                {isCollapsed ? (
                                    <HiMiniBars3 size={26} />
                                ) : (
                                    <IoCloseOutline size={30} />
                                )}
                            </button>
                        </div>
                        <div>
                            <span className="text-sm capitalize">
                                {formatPathname(location.pathname)}
                            </span>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-square"
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    {pendingCount > 0 && (
                                        <span className="badge indicator-item badge-primary badge-xs"></span>
                                    )}
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-neutral shadow"
                            >
                                {pendingSales.length > 0 ? (
                                    pendingSales.map((sale, index) => (
                                        <li key={index}>
                                            <a
                                                onClick={() =>
                                                    navigate(
                                                        `/approval/${sale['SALES ID']}?doc=sales&sales_id=${sale._id}`
                                                    )
                                                }
                                            >
                                                <p>Approval {index + 1}</p>
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <a>
                                            <p>No alerts ..</p>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Sidebar
