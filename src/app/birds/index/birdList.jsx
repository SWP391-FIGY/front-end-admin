import React, { useEffect, useState } from "react";
import { birdColumns, birdInfo } from "./birdInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const BirdList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/bird?expand=cage,species`,
  });

  console.log("Fetched bird data", response);
  if (error) {
    message.error("Error While Getting Bird data");
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  const customStyles = {
    rows: {
      style: {
        minHeight: "200px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "3px", // override the cell padding for data cells
        paddingRight: "3px",
      },
    },
    cells: {
      style: {
        paddingLeft: "3px", // override the cell padding for data cells
        paddingRight: "3px",
      },
    },
  };

  return (
    <>
      <div className="flex flex-row">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            console.log(keyword);
          }}
          name="search"
          placeholder="Enter your search"
        />
      </div>
      <DataTable
        columns={birdColumns}
        data={
          keyword && keyword.length > 0
            ? response.filter(
                (x) =>
                  x.ID.includes(keyword) || x.Description.includes(keyword)
              )
            : response
        }
        pagination
        className="overflow-auto"
        customStyles={customStyles}
      />
    </>
  );
};

export default BirdList;
