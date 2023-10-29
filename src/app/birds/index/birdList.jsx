
import React from "react";
import { birdColumns, birdInfo } from "./birdInfo";
import DataTable from "react-data-table-component";

const BirdList = () => {

  if (!birdInfo) return <>No Data</>;
  return (
    <>
      <DataTable
        columns={birdColumns}
        data={[...birdInfo]}
        className="opacity-100"
        pagination
      />
    </>
  );
};

export default BirdList;
