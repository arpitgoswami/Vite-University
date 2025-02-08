import { useParams } from 'react-router-dom'

import Sidebar from '../components/Sidebar'

import Overview from '../layouts/Overview'
import Tasks from '../layouts/Tasks'

import SalesReport from '../layouts/SalesReport'
import PPIC from '../layouts/PPIC'

import Rejected from '../layouts/employees/Rejected'
import Employee from '../layouts/employees/Employees'

import Attendance from '../layouts/employees/Attendance'
import Calendar from '../layouts/tasks/Calendar'

import WorkPlace from '../layouts/employees/WorkPlace'

function Dashboard() {
    const params = useParams()

    return (
        <>
            <Sidebar />
            <div className="ml-64">
                {params.path === 'overview' && <Overview />}
                {params.path === 'tasks' && <Tasks />}
                {params.path === 'sales' && <SalesReport />}
                {params.path === 'ppic' && <PPIC />}

                {params.path === 'rejected' && <Rejected />}

                {params.path === 'employees' && <Employee />}

                {params.path === 'calendar' && <Calendar />}
                {params.path === 'attendance' && <Attendance />}
            </div>
        </>
    )
}

export default Dashboard
