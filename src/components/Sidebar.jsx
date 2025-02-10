import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { readCookie, handleDeleteCookie } from '../utils/cookieUtils'
import axios from '@axios'

// Import only needed icons
import { RxDashboard } from 'react-icons/rx'
import { BiTask } from 'react-icons/bi'
import { LuUsersRound } from 'react-icons/lu'
import { FaTable, FaShoppingBag } from 'react-icons/fa'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'
import { IoCalendarNumber } from 'react-icons/io5'

function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const username = readCookie('username')

    const sidebarItems = [
        {
            label: 'Overview',
            icon: <RxDashboard size={20} />,
            path: 'overview',
        },
        {
            label: 'RM Quarantine',
            icon: <IoCalendarNumber size={20} />,
            path: 'rmquaratine',
        },
        { label: 'Tasks', icon: <BiTask size={20} />, path: 'tasks' },
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
        { label: 'Profile', icon: <CgProfile size={20} />, path: 'profile' },
        {
            label: 'Logout',
            icon: <BiLogOutCircle size={20} />,
            action: () => handleDeleteCookie(username),
            className: 'btn-error btn-outline',
        },
    ]

    const getItemClassName = (item) => {
        const baseClasses =
            'flex items-center cursor-pointer rounded space-x-2 m-2 text-sm hover:bg-base-100 hover:text-neutral p-3'
        const activeClasses = location.pathname.includes(item.path)
            ? 'bg-neutral'
            : ''
        const customClasses = item.className || ''

        return `${baseClasses} ${activeClasses} ${customClasses}`.trim()
    }

    const handleItemClick = (item) => {
        if (item.path) {
            navigate(`../dashboard/${item.path}`)
        }
        if (item.action) {
            item.action()
        }
    }

    return (
        <div className="flex">
            <aside className="fixed z-10 h-screen w-56 bg-gray-800 text-white">
                <nav>
                    <div>
                        <div className="cursor-pointer">
                            <img
                                src="/logo.jpg"
                                alt="Logo"
                                className="mx-2 my-2 w-52 rounded"
                            />
                        </div>
                        <ul className="space-y-2">
                            {sidebarItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleItemClick(item)}
                                >
                                    <a className={getItemClassName(item)}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </aside>
            <ToastContainer />
        </div>
    )
}

export default Sidebar
