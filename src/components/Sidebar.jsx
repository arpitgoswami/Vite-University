import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { readCookie, handleDeleteCookie } from '../utils/cookieUtils'

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
        { label: 'Todos', icon: <BiTask size={20} />, path: 'todos' },
        {
            label: 'Employees',
            icon: <LuUsersRound size={20} />,
            path: 'employees',
        },
        {
            label: 'Candidates',
            icon: <LuUsersRound size={20} />,
            path: 'candidates',
        },
        {
            label: 'Attendance',
            icon: <FaTable size={20} />,
            path: 'attendance',
        },
        {
            label: 'PO Data',
            icon: <FaShoppingBag size={20} />,
            path: 'po',
        },
        {
            label: 'Raw Material',
            icon: <HiOutlineDocumentReport size={20} />,
            path: 'rawmaterial',
        },
        {
            label: 'Packing Material',
            icon: <CgProfile size={20} />,
            path: 'packingmaterial',
        },
        {
            label: 'Customers',
            icon: <CgProfile size={20} />,
            path: 'customers',
        },
        {
            label: 'Logout',
            icon: <BiLogOutCircle size={20} />,
            action: () => handleDeleteCookie(username),
            className: 'btn-error btn-outline',
        },
    ]

    const getItemClassName = (item) => {
        const baseClasses =
            'flex items-center cursor-pointer rounded space-x-3 mx-3 my-1 px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-700'
        const activeClasses = location.pathname.includes(item.path)
            ? 'bg-gray-700 text-white font-medium'
            : 'text-gray-300'
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
            <aside className="fixed z-10 h-screen w-64 bg-gray-800 shadow-xl">
                <nav className="flex h-full flex-col">
                    <div className="border-b border-gray-700 px-3 py-4">
                        <img
                            src="/logo.jpg"
                            alt="Logo"
                            className="w-full rounded shadow-md transition-opacity duration-200 hover:opacity-90"
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ul className="py-3">
                            {sidebarItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleItemClick(item)}
                                >
                                    <a className={getItemClassName(item)}>
                                        <span>{item.icon}</span>
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
