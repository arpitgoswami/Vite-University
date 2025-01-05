import DataTable from '@interface/DataTable'

function SalesReport() {
    return (
        <>
            <DataTable
                url={'sales'}
                header={'Sales Entry'}
                isViewAllowed={true}
            />
        </>
    )
}

export default SalesReport
