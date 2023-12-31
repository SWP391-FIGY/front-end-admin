import React, { useEffect, useState } from "react";
import { cageColumns, cageInfo } from "./cageInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const CageList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/cage?expand=species,currentbirds`,
  });

  console.log("Fetched cage data", response);
  if (error) {
    message.error('Error While Getting Cage data')
    return <>No Data</>
  };
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );

    const customStyles = {

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
          columns={cageColumns}
          data={
            response && response.length > 0 && keyword && keyword.length > 0
              ? response.filter((x) => {
                  console.log('filter item', x);
                  const idMatch = x.Id.toString().includes(keyword);
                  const speciesMatch = x.Species.Name.toLowerCase().includes(keyword.toLowerCase());
  
                  return idMatch || speciesMatch;
                })
              : response
          }
          pagination
          className="overflow-auto"
          customStyles={customStyles}
        />
      </>
    );
    
  };
  
  export default CageList;
  
