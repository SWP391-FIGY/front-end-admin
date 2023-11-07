import React from "react";
import { speciesColumns, speciesInfo } from "./speciesInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const SpeciesList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/species`,
  });

  console.log("Fetched species data", response);
  if (error) {
    message.error('Error While Getting Species data')
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
      <DataTable columns={speciesColumns} data={response} pagination className="overflow-auto" />
    </>
  );
};

export default SpeciesList;
