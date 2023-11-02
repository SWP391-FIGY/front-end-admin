import React from "react";
import { birdColumns, birdInfo } from "./birdInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const BirdList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/bird?expand=cage,species`,
  });

  console.log("Fetched bird data", response);
  if (error) {
    message.error('Error While Getting Bird data')
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
      <DataTable columns={birdColumns} data={response} pagination />
    </>
  );
};

export default BirdList;
