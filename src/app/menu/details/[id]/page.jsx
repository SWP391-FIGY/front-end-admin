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
    url: `${API}/mealMenu/?filter=ID%20eq%20${menuId}&expand=species,menuDetails($expand=Food)`,
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

  const getBirdStatus = (birdStatus) => {
    const statusMapping = {
      1: "Assigned",
      2: "Not assigned",
    };
    return statusMapping[birdStatus] || "Unknown";
  };

  const getMenuStatus = (menuStatus) => {
    const statusMapping = {
      1: "In use",
      2: "Not in use",
      3: "Being revised",
    };
    return statusMapping[menuStatus] || "Unknown";
  };

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
              <p>{menuData.ID}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="menuName" className="text-lg font-bold">
                Name
              </label>
              <p>{menuData.MenuName}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="speciesID" className="text-lg font-bold">
                Species
              </label>
              <p>{menuData.Species.Name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="daysBeforeFeeding" className="text-lg font-bold">
                Min Days Before Feeding
              </label>
              <p>{menuData.DaysBeforeFeeding}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="size" className="text-lg font-bold">
                Size
              </label>
              <p>{menuData.Size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birdStatus" className="text-lg font-bold">
                Bird Status
              </label>
              <p>{getBirdStatus(menuData.BirdStatus)}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="menuStatus" className="text-lg font-bold">
                Menu Status
              </label>
              <p>{getMenuStatus(menuData.MenuStatus)}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="nutritionalIngredients" className="text-lg font-bold">
                Nutritional Ingredients
              </label>
              <p>{menuData.NutritionalIngredients}</p>
            </div>
            <div className="col-span-2">
              <label htmlFor="foodList" className="text-lg font-bold">
                Food List
              </label>
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="border p-2">Food ID</th>
                    <th className="border p-2">Food Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {menuData.MenuDetails &&
                    menuData.MenuDetails.map((detail) => (
                      <tr key={detail.ID}>
                        <td className="border p-2">{detail.Food.ID}</td>
                        <td className="border p-2">{detail.Food.Name}</td>
                        <td className="border p-2">{detail.Quantity}</td>
                        <td className="border p-2">{detail.Food.Unit}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MenuDetailPage;
