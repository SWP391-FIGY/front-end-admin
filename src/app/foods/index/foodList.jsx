import React from "react";
import { foodColumns, foodInfo } from "./foodInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const FoodList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/food`,
  });

  console.log("Fetched food data", response);
  if (error) {
    message.error('Error While Getting Food data')
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
      <DataTable columns={foodColumns} data={response} pagination className="overflow-auto" />
    </>
  );
};

export default FoodList;
