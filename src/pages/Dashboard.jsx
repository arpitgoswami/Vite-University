import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

// Layout imports
import Overview from '../layouts/Overview'
import Tasks from '../layouts/Tasks'
import SalesReport from '../layouts/SalesReport'
import PPIC from '../layouts/PPIC'
import RMQuaratine from '../layouts/RMQuaratine'

// Employee related imports
import Rejected from '../layouts/employees/Rejected'
import Employee from '../layouts/employees/Employees'
import Attendance from '../layouts/employees/Attendance'
import WorkPlace from '../layouts/employees/WorkPlace'

function Dashboard() {
    const params = useParams()

    return (
        <>
            <Sidebar />
            <div className="ml-56">
                {/* Main layouts */}
                {params.path === 'overview' && <Overview />}
                {params.path === 'tasks' && <Tasks />}
                {params.path === 'sales' && <SalesReport />}
                {params.path === 'ppic' && <PPIC />}

                {/* Employee related layouts */}
                {params.path === 'rejected' && <Rejected />}
                {params.path === 'employees' && <Employee />}
                {params.path === 'attendance' && <Attendance />}

                {/* Calendar */}
                {params.path === 'rmquaratine' && <RMQuaratine />}
            </div>
        </>
    )
}

export default Dashboard
