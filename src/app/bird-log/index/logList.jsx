import React from "react";
import { logColumns, logInfo } from "./logInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const LogList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/log`,
  });

  console.log("Fetched bird log data", response);
  if (error) {
    message.error('Error While Getting Bird Log data')
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
      <DataTable columns={logColumns} data={response} pagination />
    </>
  );
};

export default LogList;
