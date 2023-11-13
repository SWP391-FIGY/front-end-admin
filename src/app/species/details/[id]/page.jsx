'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import Image from "next/image"
import DataTable from "react-data-table-component";
import { birdColumns } from "@/app/birds/index/birdInfo";

const { default: PageLayout } = require("@/layout/pageLayout")

const BirdTable = ({ birdData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h3 className="text-2xl font-bold mb-4">Birds From Species</h3>
      <DataTable
        columns={birdColumns}
        data={birdData}
        pagination
        //customStyles={customStyles}
      />
    </div>
  );
};

const SpeciesDetailPage = () => {
  const params = useParams();
  const speciesId = parseInt(params.id, 10);

  const { response: birdResponse, loading: birdLoading, error: birdError } = useAxios({
    method: "get",
    url: `${API}/bird/?filter=Species/ID eq ${speciesId}&$expand=Cage,Species`,
  });

  const birdData = birdResponse || [];

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/species/?filter=ID%20eq%20${speciesId}&select=*`,
  });

  if (isNaN(speciesId) || speciesId < 0) {
    return (
      <PageLayout>
        <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
          <p>Species not found.</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    message.error("Error While Getting Species Data");
    return (
      <PageLayout>
        <div className="flex flex-col gap-4">
          <Link
            href={"/species/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Species Details</h2>
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
              href={"/species/index"}
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
            </Link>
            <h2 className="text-3xl font-bold">Species Details</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Spinner />
          </div>
        </div>
      </PageLayout>
    );

  const speciesData = response[0];
  console.log(speciesData);

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
              <label htmlFor="color" className="text-lg font-bold">Name</label>
              <p>{speciesData.Name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="color" className="text-lg font-bold">Color</label>
              <p>{speciesData.Color}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="size" className="text-lg font-bold">Size (cm)</label>
              <p>{speciesData.Size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="voice" className="text-lg font-bold">Voice</label>
              <iframe src={speciesData.Voice} alt="voice" style={{ width: '100px', height: 'auto' }}/>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="imageLink" className="text-lg font-bold">Image</label>
              <Image src={speciesData.ImageLink} alt="Species Image"  width= {100} height={100}/>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="lifeExpectancy" className="text-lg font-bold">Life Expectancy (Year)</label>
              <p>{speciesData.LifeExpectancy} Years</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="habitat" className="text-lg font-bold">Habitat</label>
              <p>{speciesData.Habitat}</p>
            </div>
            
          </div>
        </div>
        <BirdTable birdData={birdData} />
      </div>
    </PageLayout>
  );
}


export default SpeciesDetailPage;
