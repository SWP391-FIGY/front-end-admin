'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { birdInfo } from "../../index/birdInfo"

const { default: PageLayout } = require("@/layout/pageLayout")

const BirdDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

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


if (isNaN(index) || index < 0 || index >= birdInfo.length) {
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <p>Bird not found.</p>
      </div>
    </PageLayout>
  );
}

const birdData = birdInfo[index];
const birthDateParts = birdData.birthDate.split('/');
const day = parseInt(birthDateParts[0], 10);
const month = parseInt(birthDateParts[1], 10) - 1; // Subtract 1 because months are zero-based
const year = parseInt(birthDateParts[2], 10);

const formattedBirthDate = new Date(year, month, day).toLocaleDateString();

return (
  <PageLayout>
    <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col gap-4'>
        <Link href={'/birds/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className='text-3xl font-bold'>Bird Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="name" value="Bird name" />
            <p>{birdData.name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="species" value="Bird species" />
            <p>{birdData.species}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="birthDate" value="Birth Date" />
            <p>{formattedBirthDate}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="gender" value="Bird gender" />
            <p>{birdData.gender}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="status" value="Bird status" />
            <p>{birdData.status}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);
}


export default BirdDetailPage;
