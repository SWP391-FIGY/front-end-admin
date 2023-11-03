import React from "react";
import { taskColumns, taskInfo } from "./taskInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const TaskList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/task`,
  });

  console.log("Fetched task data", response);
  if (error) {
    message.error('Error While Getting Task data')
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
      <DataTable columns={taskColumns} data={response} pagination />
    </>
  );
};

export default TaskList;
