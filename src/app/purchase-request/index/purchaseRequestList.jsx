
import React from "react";
import DataTable from "react-data-table-component";
import { purchaseRequestColumns, purchaseRequestInfo } from "./purchaseRequestInfo";

const PurchaseRequestList = () => {

  if (!purchaseRequestInfo) return <>No Data</>;
  return (
    <>
      <DataTable
        columns={purchaseRequestColumns}
        data={purchaseRequestInfo}
        className="opacity-100"
        pagination
      />
    </>
  );
};

export default PurchaseRequestList;
