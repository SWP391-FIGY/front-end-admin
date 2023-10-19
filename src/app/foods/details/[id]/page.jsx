'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { foodInfo } from "../../index/foodInfo"

const { default: PageLayout } = require("@/layout/pageLayout")

const FoodDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

if (isNaN(index) || index < 0 || index >= foodInfo.length) {
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <p>Food not found.</p>
      </div>
    </PageLayout>
  );
}

const foodData = foodInfo[index];

return (
  <PageLayout>
    <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col gap-4'>
        <Link href={'/foods/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className='text-3xl font-bold'>Food Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className="text-lg font-bold">Name</label>
            <p>{foodData.name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="nutritionalIngredients" className="text-lg font-bold">Nutritional ingredients</label>
            <p>{foodData.nutritionalIngredients}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="storageConditions" className="text-lg font-bold">Storage conditions</label>
            <p>{foodData.storageConditions}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);
}


export default FoodDetailPage;
