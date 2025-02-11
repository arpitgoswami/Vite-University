import { useParams } from 'react-router-dom'

import Todos from './Todos'
import Employee from './Employees'
import Candidates from './Candidates'
import Attendance from './Attendance'
import POData from './POData'
import RawMaterial from './RawMaterial'
import PackingMaterial from './PackingMaterial'
import Customers from './Customers'

import Sidebar from '../components/Sidebar'

import Overview from '../layouts/Overview'
import SalesReport from '../layouts/SalesReport'
import PPIC from '../layouts/PPIC'
import RMQuaratine from '../layouts/RMQuaratine'

function Dashboard() {
    const params = useParams()

    return (
        <>
            <Sidebar />
            <div className="ml-64">
                {params.path === 'todos' && <Todos />}
                {params.path === 'employees' && <Employee />}
                {params.path === 'candidates' && <Candidates />}
                {params.path === 'attendance' && <Attendance />}
                {params.path === 'po' && <POData />}
                {params.path === 'rawmaterial' && <RawMaterial />}
                {params.path === 'packingmaterial' && <PackingMaterial />}
                {params.path === 'customers' && <Customers />}

                {params.path === 'overview' && <Overview />}
                {params.path === 'sales' && <SalesReport />}
                {params.path === 'ppic' && <PPIC />}

                {/* Employee related layouts */}

                {/* Calendar */}
                {params.path === 'rmquaratine' && <RMQuaratine />}
            </div>
        </>
    )
}

export default Dashboard
