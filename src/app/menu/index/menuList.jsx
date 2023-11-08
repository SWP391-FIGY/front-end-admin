import React, { useState } from "react";
import { menuColumns, menuInfo } from "./menuInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const MenuList = () => {
  const [keyword, setKeyword] = useState("");

  const { response, loading, error } = useAxios({
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
          columns={menuColumns}
          data={
            keyword && keyword.length > 0
              ? response.filter((x) => {
                  const idMatch = x.ID.toString().includes(keyword);
                  const nameMatch = x.MenuName.toLowerCase().includes(keyword.toLowerCase());
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
  
  export default MenuList;
