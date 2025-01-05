import DataTable from '@interface/DataTable'

function Employee() {
    return (
        <DataTable
            url={'users'}
            header={'Employees Entry'}
            isViewAllowed={false}
        />
    )
}

export default Employee
