import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { purchaseOrderColumns, purchaseOrderInfo } from "./purchaseOrderInfo";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";

const PurchaseOrderList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/purchaseOrder/?&expand=creator,purchaseRequestDetails($expand=Food)`,
  });

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
