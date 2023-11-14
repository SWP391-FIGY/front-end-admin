"use client";
import { Button, Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft, HiPlus } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import { BsPlus } from "react-icons/bs";
import DataTable from "react-data-table-component";
import { inventoryLogColumns } from "../../index/foodInfo";

const { default: PageLayout } = require("@/layout/pageLayout");

const FoodDetailPage = () => {
  const params = useParams();
  const foodId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/food/?filter=ID%20eq%20${foodId}&expand=inventoryLog`,
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
    message.error("Error While Getting Food Data");
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
              <label htmlFor="ID" className="text-lg font-bold">
                ID
              </label>
              <p>{foodData.ID}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="Name" className="text-lg font-bold">
                Name
              </label>
              <p>{foodData.Name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="NutritionalIngredients"
                className="text-lg font-bold"
              >
                Nutritional Ingredients
              </label>
              <p>{foodData.NutritionalIngredients}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="StorageCondition" className="text-lg font-bold">
                Storage Condition
              </label>
              <p>{foodData.StorageCondition}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="Unit" className="text-lg font-bold">
                Unit
              </label>
              <p>{foodData.Unit}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="StandardPrice" className="text-lg font-bold">
                Standard Price
              </label>
              <p>{foodData.StandardPrice}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="SafetyThreshold" className="text-lg font-bold">
                Safety Threshold
              </label>
              <p>{foodData.SafetyThreshold}</p>
            </div>
          </div>
        </div>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl font-bold">Food&apos;s Inventory Log</h2>

            <Link href={`/foods/details/${foodId}/inventory-log`}>
              <Button>
                <div className="flex flex-row justify-center gap-4">
                  <div className="my-auto">
                    <HiPlus />
                  </div>
                  <p>Add new inventory log</p>
                </div>
              </Button>
            </Link>
          </div>

          {foodData && foodData.InventoryLog && <DataTable
            columns={inventoryLogColumns}
            data={foodData.InventoryLog}
            defaultSortFieldId={1}
            defaultSortAsc={false}
          />}
        </div>
      </div>
    </PageLayout>
  );
};

export default FoodDetailPage;
