"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const FoodDetailPage = () => {
  const params = useParams();
  const foodId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/food/?filter=ID%20eq%20${foodId}`,
  });

  if (isNaN(foodId) || foodId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Food not found.</p>
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

  const foodData = response[0];
  console.log(foodData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/foods/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Food Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{foodData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="text-lg font-bold">
                Name
              </label>
              <p>{foodData.name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="nutritionalIngredients" className="text-lg font-bold">
                Nutritional Ingredients
              </label>
              <p>{foodData.nutritionalIngredients}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="storageCondition" className="text-lg font-bold">
                Storage Condition
              </label>
              <p>{foodData.storageCondition}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="unit" className="text-lg font-bold">
                Unit
              </label>
              <p>{foodData.unit}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="standardPrice" className="text-lg font-bold">
                Standard Price
              </label>
              <p>{foodData.standardPrice}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="safetyThreshold" className="text-lg font-bold">
                Safety Threshold
              </label>
              <p>{foodData.safetyThreshold}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FoodDetailPage;
