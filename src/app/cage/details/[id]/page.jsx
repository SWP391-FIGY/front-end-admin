"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import DataTable from "react-data-table-component";
import { birdColumns } from "@/app/birds/index/birdInfo";

const { default: PageLayout } = require("@/layout/pageLayout");

const BirdTable = ({ birdData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h3 className="text-2xl font-bold mb-4">Birds in Cage</h3>
      <DataTable
        columns={birdColumns}
        data={birdData}
        pagination
        //customStyles={customStyles}
      />
    </div>
  );
};

const CageDetailPage = () => {
  const params = useParams();
  const cageId = parseInt(params.id, 10);

  const { response: birdResponse, loading: birdLoading, error: birdError } = useAxios({
    method: "get",
    url: `${API}/bird/?filter=Cage/ID eq ${cageId}&$expand=Cage,Species`,
  });

  const birdData = birdResponse || [];

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/cage/?filter=ID%20eq%20${cageId}`,
  });

  if (isNaN(cageId) || cageId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Cage not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Cage Data");
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

  const cageData = response[0];
  console.log(cageData);

  const getStatusLabel = (status) => {
    const statusMapping = {
      1: "In use",
      2: "Maintenance",
      3: "Broken",
      4: "Not in use"
    };
    return statusMapping[status] || "Unknown";
  };

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/cage/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Cage Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{cageData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="size" className="text-lg font-bold">
                Size
              </label>
              <p>{cageData.size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="color" className="text-lg font-bold">
                Color
              </label>
              <p>{cageData.color}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="area" className="text-lg font-bold">
                Area
              </label>
              <p>{cageData.area}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="type" className="text-lg font-bold">
                Type
              </label>
              <p>{cageData.type}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cageStatus" className="text-lg font-bold">
                Status
              </label>
              <p>{getStatusLabel(cageData.cageStatus)}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="capacity" className="text-lg font-bold">
                Capacity
              </label>
              <p>{cageData.capacity}</p>
            </div>
          </div>
        </div>
        <BirdTable birdData={birdData} />
      </div>
    </PageLayout>
  );
};

export default CageDetailPage;
