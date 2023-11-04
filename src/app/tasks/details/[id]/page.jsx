"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const TaskDetailPage = () => {
  const params = useParams();
  const taskId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/task/?filter=ID%20eq%20${taskId}`,
  });

  if (isNaN(taskId) || taskId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Task not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Task data");
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <Spinner />
        </div>
      </PageLayout>
    );

  const taskData = response[0];
  console.log(taskData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/tasks/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Task Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{taskData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birdID" className="text-lg font-bold">
                Bird ID
              </label>
              <p>{taskData.birdID}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cageID" className="text-lg font-bold">
                Cage ID
              </label>
              <p>{taskData.cageID}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="staffID" className="text-lg font-bold">
                Staff ID
              </label>
              <p>{taskData.staffID}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="taskName" className="text-lg font-bold">
                Task Name
              </label>
              <p>{taskData.taskName}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="dateTime" className="text-lg font-bold">
                Date Time
              </label>
              <p>{taskData.dateTime}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="description" className="text-lg font-bold">
                Description
              </label>
              <p>{taskData.description}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="text-lg font-bold">
                Status
              </label>
              <p>{taskData.status}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TaskDetailPage;
