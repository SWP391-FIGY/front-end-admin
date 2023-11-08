import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { purchaseRequestColumns } from "./purchaseRequestInfo";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { message } from "antd";
import { Spinner } from "flowbite-react";

const PurchaseRequestList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/purchaseRequest/?&expand=creator,purchaseRequestDetails($expand=Food)`,
  });

  console.log("Fetched purchase request data", response);
  if (error) {
    message.error('Error While Getting Purchase Request data')
    return <>No Data</>
  };
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
          columns={purchaseRequestColumns}
          data={
            keyword && keyword.length > 0
              ? response.filter((x) => {
                  const idMatch = x.ID.toString().includes(keyword);
                  const nameMatch = x.Creator.Name.toLowerCase().includes(keyword.toLowerCase());
                  return idMatch || nameMatch;
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
  
  export default PurchaseRequestList;