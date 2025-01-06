import DataTable from '@interface/DataTable'

function Employee() {
    return (
        <DataTable
            url={'users'}
            header={'Employees Data Sheet'}
            isViewAllowed={false}
        />
    )
}

export default Employee
