import React, { useEffect, useState } from "react";
import { taskColumns, taskInfo } from "./taskInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "@/app/users/index/userInfo";

const TaskList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/task?expand=staff`,
  });

  const [taskData, setTaskData] = useState([]);

  const user = getUserInfo();
  useEffect(() => {
    if (user && response && response.length > 0) {
      userRoleEnums[user.role] === "Staff"
        ? setTaskData(response.filter((x) => x.Staff.Role == user.role))
        : setTaskData(response)
       
    }
  }, [response]);

  console.log("Fetched task data", response);
  if (error) {
    message.error("Error While Getting Task data");
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
          columns={taskColumns}
          data={
            keyword && keyword.length > 0
              ? taskData.filter((x) => {
                  const idMatch = x.id.toString().includes(keyword);
                  //const birdIdMatch = (x.birdId != null && x.birdId.toString().includes(keyword));
                  const nameMatch = x.taskName.toLowerCase().includes(keyword.toLowerCase());
                  return idMatch || nameMatch;
                })
              : taskData
          }
          pagination
          className="overflow-auto"
          customStyles={customStyles}
        />
      </>
    );
    
  };
  
  export default TaskList;