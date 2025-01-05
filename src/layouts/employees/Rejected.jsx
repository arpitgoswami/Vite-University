import DataTable from '@interface/DataTable'

function Rejected() {
    return (
        <DataTable
            url={'rejected'}
            header={'Rejected Candidates'}
            isViewAllowed={false}
        />
    )
}

export default Rejected
