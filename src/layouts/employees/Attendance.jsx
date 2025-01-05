import DataTable from '@interface/DataTable'

function Attendance() {
    return (
        <DataTable
            url={'/attendance'}
            header={'PPIC Entry'}
            isViewAllowed={false}
        />
    )
}

export default Attendance
