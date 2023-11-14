import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { purchaseOrderColumns, purchaseOrderInfo } from "./purchaseOrderInfo";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { Spinner } from "flowbite-react";

const PurchaseOrderList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/purchaseOrder/?expand=creator,purchaseRequest`,
  });

  if (error) return <>No Data</>;
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <DataTable
        columns={purchaseOrderColumns}
        data={response}
        className="opacity-100"
        pagination
      />
    </>
  );
};

export default PurchaseOrderList;
