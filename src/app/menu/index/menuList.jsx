import React from "react";
import { menuColumns, menuInfo } from "./menuInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const MenuList = () => {

  const {
    response: mealMenuResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/mealMenu/?&expand=species,menuDetails($expand=Food)`,
  });
  

  console.log("Fetched meal menu data", response);
  if (error) {
    message.error('Error While Getting Meal Menu data')
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
      <DataTable columns={menuColumns} data={response} pagination />
    </>
  );
};

export default MenuList;
