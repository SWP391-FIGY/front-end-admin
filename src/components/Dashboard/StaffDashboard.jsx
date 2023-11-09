import { taskColumns } from "@/app/tasks/index/taskInfo";
import { API } from "@/constants";
import { getUserInfo } from "@/helper";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { BirdPieChart } from "../PieChart/birdPieChartData";

const StaffDashboard = () => {
  const user = getUserInfo();
  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: "get",
    url: `${API}/task?expand=staff`,
  });

  const today = new Date();
  const twoDaysFromToday = today.setDate(today.getDate() + 2);
  console.log("Task list", taskResponse);
  return (
    <div className="flex flex-row gap-4 ">
      <div className="flex flex-col gap-4 w-[50%]">
        <h2 className="text-3xl font-bold">Task List</h2>
        {taskResponse && (
          <DataTable
            columns={taskColumns}
            data={taskResponse.filter((x) => {
              const taskDeadline = moment(
                x.DateTime,
                "MM/DD/YYYY  hh:mm:ss A"
              )._d;
              console.log(taskDeadline);
              return (
                taskDeadline <= twoDaysFromToday &&
                x.StaffID == user.id &&
                x.Status != "Done"
              );
            })}
            pagination
            className="overflow-auto"
          />
        )}
        {taskLoading && <Spinner />}
        {taskError && <div>Error</div>}
      </div>
      <div className="flex flex-col w-[50%] gap-4 ">
        <h2 className="text-3xl font-bold">Bird Record</h2>
        <BirdPieChart />
      </div>
    </div>
  );
};

export default StaffDashboard;
