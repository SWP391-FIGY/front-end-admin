"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { Table } from "flowbite-react";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import DataTable from "react-data-table-component";
import moment from "moment";

const { default: PageLayout } = require("@/layout/pageLayout");

const MenuDetailPage = () => {
  const params = useParams();
  const menuId = parseInt(params.id, 10);

  //  useEffect(() => {
  //    axios
  //      .get(`${API}/birds/${uid}`)
  //      .then(response => {
  //        setBirdData(response.data);
  //        setLoading(false);
  //      })
  //      .catch(error => {
  //        setLoading(false);
  //        console.log('An error occurred:', error.response);
  //      });
  //  }, [uid]);


  const {
    response: menuResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/meal-menu/?filter=ID%20eq%20${index}&expand=species,menuDetails($expand=Food)`,
  });

  if (isNaN(index) || index < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Meal menu not found.</p>
        </div>
      </PageLayout>
    );
  }

  console.log(menuResponse);

  const menuData = menustResponse
    ? pmenuesponse[0]
    : null;




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
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="menuId" className="text-lg font-bold">
              Menu Id
            </label>
            <p>{menuData.id}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="menuName" className="text-lg font-bold">Name</label>
              <p>{menuData.menuName}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="species" className="text-lg font-bold">
                Species
              </label>
              <p>{menuData.Species.Name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="daysBeforeFeeding" className="text-lg font-bold">Min days Before Feeding</label>
              <p>{menuData.daysBeforeFeeding}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="size" className="text-lg font-bold">Size</label>
              <p>{menuData.size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birdStatus" className="text-lg font-bold">Bird status</label>
              <p>{menuData.birdStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="menuStatus" className="text-lg font-bold">Menu Status</label>
              <p>{menuData.menuStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="nutritionalIngredients" className="text-lg font-bold">
                Nutritional Ingredients
              </label>
              <p>{menuData.nutritionalIngredients}</p>
            </div>

            
            <div className="col-span-2 ">
                <label className="text-lg font-bold">List Food</label>
                <DataTable
                  columns={menuDetailColumns}
                  data={menuData.menuDetails}
                  pagination
                />
              </div>
            
            
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MenuDetailPage;
