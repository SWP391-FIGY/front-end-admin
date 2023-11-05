import React from "react";
import DataTable from "react-data-table-component";
import { purchaseRequestColumns } from "./purchaseRequestInfo";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";

const PurchaseRequestList = () => {
  const {
    response: purchaseRequestResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/purchaseRequest/?&expand=creator,purchaseRequestDetails($expand=Food)`,
  });

  if (!purchaseRequestResponse) return <>No Data</>;
  return (
    <>
      <DataTable
        columns={purchaseRequestColumns}
        data={purchaseRequestResponse}
        className="opacity-100"
        pagination
      />
    </>
  );
};

export default PurchaseRequestList;
