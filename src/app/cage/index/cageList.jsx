import React from "react";
import { cageColumns, cageInfo } from "./cageInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const CageList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/cage`,
  });

  console.log("Fetched cage data", response);
  if (error) {
    message.error('Error While Getting Cage data')
    return <>No Data</>
  };
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <DataTable columns={cageColumns} data={response} pagination className="overflow-auto" />
    </>
  );
};

export default CageList;
