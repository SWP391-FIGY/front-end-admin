
import React from "react";
import DataTable from "react-data-table-component";
import { menuColumns, menuInfo } from "./menuInfo";

const MenuList = () => {

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
