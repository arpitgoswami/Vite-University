import DataTable from "@interface/DataTable";

function OrderSheet() {
  return (
    <DataTable
      url={"order_sheets"}
      header={"Order Sheet"}
      isViewAllowed={"none"}
    />
  );
}

export default OrderSheet;
