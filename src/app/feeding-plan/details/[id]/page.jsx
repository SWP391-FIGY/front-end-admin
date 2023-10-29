'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { planInfo } from "../../index/planInfo"

const { default: PageLayout } = require("@/layout/pageLayout")

const PlanDetailPage = () => {
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


if (isNaN(index) || index < 0 || index >= planInfo.length) {
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <p>Feeding Plan not found.</p>
      </div>
    </PageLayout>
  );
}

const planData = planInfo[index];
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
        <h2 className='text-3xl font-bold'>Feeding Plan Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="birdId" className="text-lg font-bold">Menu ID</label>
            <p>{planData.menuId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="cageId" className="text-lg font-bold">Bird ID</label>
            <p>{planData.birdId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="status" className="text-lg font-bold">Date and Time</label>
            <p>{formattedDateAndTime(planData.dateAndTime)}</p>
          </div>
          <div planData="col-span-2 sm:col-span-1">
            <label htmlFor="feedingStatus" className="text-lg font-bold">Feeding Status</label>
            <p>{planData.feedingStatus}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="notation" className="text-lg font-bold">Notation</label>
            <p>{planData.notation}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);
}


export default PlanDetailPage;
