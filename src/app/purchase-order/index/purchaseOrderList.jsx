
import React from "react";
import DataTable from "react-data-table-component";
import { purchaseOrderColumns, purchaseOrderInfo } from "./purchaseOrderInfo";

const PurchaseOrderList = () => {

  if (!purchaseOrderInfo) return <>No Data</>;
  return (
    <>
      <DataTable
        columns={purchaseOrderColumns}
        data={purchaseOrderInfo}
        className="opacity-100"
        pagination
      />
    </>
  );
};

export default PurchaseOrderList;
