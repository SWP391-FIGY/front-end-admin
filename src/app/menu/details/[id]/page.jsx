"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const MenuDetailPage = () => {
  const params = useParams();
  const menuId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/mealMenu/?filter=ID%20eq%20${menuId}`,
  });

  if (isNaN(menuId) || menuId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Meal menu not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Meal Menu Data");
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

  const menuData = response[0];
  console.log(menuData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/menu/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Meal Menu Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{menuData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="text-lg font-bold">
                Name
              </label>
              <p>{menuData.name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="speciesId" className="text-lg font-bold">
                Species ID
              </label>
              <p>{menuData.speciesId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="daysBeforeFeeding" className="text-lg font-bold">
                Days before feeding
              </label>
              <p>{menuData.daysBeforeFeeding}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="size" className="text-lg font-bold">
                Size
              </label>
              <p>{menuData.size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birdStatus" className="text-lg font-bold">
                Bird status
              </label>
              <p>{menuData.birdStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="menuStatus" className="text-lg font-bold">
                Menu status
              </label>
              <p>{menuData.menuStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="nutritionalIngredients" className="text-lg font-bold">
                Nutritional ingredients
              </label>
              <p>{menuData.nutritionalIngredients}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MenuDetailPage;
