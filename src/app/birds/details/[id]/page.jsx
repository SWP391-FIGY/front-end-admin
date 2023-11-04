"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";

const { default: PageLayout } = require("@/layout/pageLayout");

const BirdDetailPage = () => {
  const params = useParams();
  const birdId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/bird/?filter=ID%20eq%20${birdId}&expand=cage,species`,
  });


  if (isNaN(birdId) || birdId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Bird not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Bird data");
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

  const birdData = response[0];
  console.log(birdData);
  const birdDate = birdData.doB;
  const birthDateParts = birdDate
    ? birdDate.split("/")
    : "30/04/2023".split("/");
  const day = parseInt(birthDateParts[0], 10);
  const month = parseInt(birthDateParts[1], 10) - 1; // Subtract 1 because months are zero-based
  const year = parseInt(birthDateParts[2], 10);

  const formattedBirthDate = new Date(year, month, day).toLocaleDateString();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/birds/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Bird Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="species" className="text-lg font-bold">
                Species
              </label>
              <p>{birdData.species}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birthDate" className="text-lg font-bold">
                Birth date
              </label>
              <p>{formattedBirthDate}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="gender" className="text-lg font-bold">
                Gender
              </label>
              <p>{birdData.gender}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="text-lg font-bold">
                Status
              </label>
              <p>{birdData.status}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BirdDetailPage;
