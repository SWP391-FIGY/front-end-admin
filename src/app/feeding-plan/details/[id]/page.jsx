"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import {
  feedingPlanStatus as feedingPlanStatusEnum,
} from "../../index/planInfo";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";

const { default: PageLayout } = require("@/layout/pageLayout");

const PlanDetailPage = () => {
  const params = useParams();
  const planId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/FeedingPlan/?filter=ID%20eq%20${planId}&expand=bird,mealMenu`,
  });

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

  if (isNaN(planId) || planId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Feeding Plan not found.</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    message.error("Error While Getting Feeding Plan data");
    return (
      <PageLayout>
        <div className="flex flex-col gap-4">
          <Link
            href={"/feeding-plan/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Feeding Plan Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">No data</div>
      </PageLayout>
    );
  }

  if (loading && !error)
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <div className="flex flex-row justify-around gap-4">
            <Link
              href={"/feeding-plan/index"}
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
            </Link>
            <h2 className="text-3xl font-bold">Feeding Plan Details</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Spinner />
          </div>
        </div>
      </PageLayout>
    );

//  const formattedDateAndTime = (dateStr) => {
//    const [date, time] = dateStr.split(" ");
//    const [day, month, year] = date.split("/").map(Number);
//    const [hour, minute] = time.split(":").map(Number);
//    const formattedDate = `${day}/${month}/${year}`;
//    const formattedTime = `${hour}:${minute}`;
//    return `${formattedDate} ${formattedTime}`;
//  };

  const planData = response ? response[0] : {};
  console.log(planData);

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
          <h2 className="text-3xl font-bold">Feeding Plan Details</h2>
        </div>
        {planData ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="menu" className="text-lg font-bold">
                  Menu
                </label>
                <p>{planData.MealMenu.MenuName}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="birdId" className="text-lg font-bold">
                  Bird ID
                </label>
                <p>{planData.BirdID}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="dateTime" className="text-lg font-bold">
                  Date and Time
                </label>
                <p>{planData.DateTime}</p>
              </div>
              <div planData="col-span-2 sm:col-span-1">
                <label htmlFor="feedingStatus" className="text-lg font-bold">
                  Feeding Status
                </label>
                <p>{planData.FeedingStatus}</p>
              </div>
              <label htmlFor="Description" className="text-lg font-bold">
                Description
              </label>
              <p>{planData.Description}</p>
            </div>
          </div>
        ) : (
          <>No data</>
        )}
      </div>
    </PageLayout>
  );
};

export default PlanDetailPage;
