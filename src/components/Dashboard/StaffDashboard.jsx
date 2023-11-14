import { taskColumns } from "@/app/tasks/index/taskInfo";
import { API } from "@/constants";
import { getUserInfo } from "@/helper";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { BirdPieChart } from "../Chart/birdPieChartData";
import CageBarChartData from "../Chart/cageBarChartData";

const StaffDashboard = () => {
  const user = getUserInfo();

  // Task info from api
  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: "get",
    url: `${API}/task?expand=staff`,
  });

  // Bird info from api
  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: "get",
    url: `${API}/bird?expand=species`,
  });

  // const today = new Date();
  // const twoDaysFromToday = today.setDate(today.getDate() + 2);
  console.log("Task list", taskResponse);
  return (
    <div className="flex flex-row gap-4 ">
      <div className="flex flex-col gap-4 w-[50%]">
        <h2 className="text-3xl font-bold">Task List</h2>
        {taskResponse && (
          <DataTable
            columns={taskColumns}
            data={
              user.role == 2
                ? taskResponse.filter((x) => {
                    return x.StaffID == user.id && x.Status != "Done";
                  })
                : taskResponse.filter((x) => {
                    return x.Status != "Done";
                  })
            }
            pagination
            className="overflow-auto"
          />
        )}
        {taskLoading && <Spinner />}
        {taskError && <div>Error</div>}
      </div>
      <div className="flex flex-col w-[300px] gap-4 ">
        <h2 className="text-3xl font-bold">Bird Record</h2>
        <BirdPieChart />
        <CageBarChartData/>
      </div>
    </div>
  );
};

export default StaffDashboard;
