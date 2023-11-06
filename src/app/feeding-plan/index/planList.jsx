import React from "react";
import { planColumns, planInfo } from "./planInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const PlanList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/feedingplan?expand=bird,menu`,
  });

  console.log("Fetched feeding plan data", response);
  if (error) {
    message.error('Error While Getting Feeding Plan data')
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
      <DataTable columns={planColumns} data={response} pagination />
    </>
  );
};

export default PlanList;


