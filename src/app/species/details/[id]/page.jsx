'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { speciesInfo } from "../../index/speciesInfo"

const { default: PageLayout } = require("@/layout/pageLayout")

const SpeciesDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

if (isNaN(index) || index < 0 || index >= speciesInfo.length) {
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <p>Species not found.</p>
      </div>
    </PageLayout>
  );
}

const speciesData = speciesInfo[index];

return (
  <PageLayout>
    <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col gap-4'>
        <Link href={'/species/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className='text-3xl font-bold'>Species Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="color" className="text-lg font-bold">Color</label>
            <p>{speciesData.color}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="size" className="text-lg font-bold">Size</label>
            <p>{speciesData.size}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="voice" className="text-lg font-bold">Voice</label>
            <p>{speciesData.voice}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="imageLink" className="text-lg font-bold">Image</label>
            <img src={speciesData.imageLink} alt="Species Image" style={{ width: '100px', height: 'auto' }}/>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="age" className="text-lg font-bold">Age</label>
            <p>{speciesData.age}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="habitat" className="text-lg font-bold">Habitat</label>
            <p>{speciesData.habitat}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="total" className="text-lg font-bold">Total</label>
            <p>{speciesData.total}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);
}


export default SpeciesDetailPage;
