
import React from "react";
import DataTable from "react-data-table-component";
import { menuColumns, menuInfo } from "./menuInfo";

const MenuList = () => {

  const {
    response: mealMenuResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/mealMenu/?&expand=species,menuDetails($expand=Food)`,
  });

  if (!menuInfo) return <>No Data</>;
  return (
    <>
      <DataTable
        columns={menuColumns}
        data={menuInfo}
        className="opacity-100"
        pagination
      />
    </>
  );
};

export default MenuList;
