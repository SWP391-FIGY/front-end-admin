'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'

const { default: PageLayout } = require("@/layout/pageLayout")

const TaskDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

//  useEffect(() => {
//    axios
//      .get(`${API}/birds/${uid}`)
//      .then(response => {
//        settaskData(response.data);
//        setLoading(false);
//      })
//      .catch(error => {
//        setLoading(false);
//        console.log('An error occurred:', error.response);
//      });
//  }, [uid]);


if (isNaN(index) || index < 0 || index >= taskInfo.length) {
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <p>Task not found.</p>
      </div>
    </PageLayout>
  );
}

const taskData = taskInfo[index];
const formattedDateAndTime = (dateStr) => {
  const [date, time] = dateStr.split(' ');
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hour}:${minute}`;
  return `${formattedDate} ${formattedTime}`;
};

return (
  <PageLayout>
    <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col gap-4'>
        <Link href={'/tasks/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className='text-3xl font-bold'>Task Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="birdId" className="text-lg font-bold">Bird ID</label>
            <p>{taskData.birdId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="cageId" className="text-lg font-bold">Cage ID</label>
            <p>{taskData.cageId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="staffId" className="text-lg font-bold">Staff ID</label>
            <p>{taskData.staffId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="taskName" className="text-lg font-bold">Task Name</label>
            <p>{taskData.taskName}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="status" className="text-lg font-bold">Date and Time</label>
            <p>{formattedDateAndTime(taskData.dateAndTime)}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="description" className="text-lg font-bold">Description</label>
            <p>{taskData.description}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="status" className="text-lg font-bold">Status</label>
            <p>{taskData.status}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);
}


export default TaskDetailPage;
