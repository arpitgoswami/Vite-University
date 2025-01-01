import React from "react";
import DataTable from "@interface/DataTable";

function Overview() {
  return (
    <DataTable
      url={"order_sheets"}
      header={"Order Sheet"}
      isViewAllowed={"none"}
    />
  );
}

export default Overview;
