"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import { birdStatusEnum } from "../../index/birdInfo";
import Image from "next/image";
import moment from "moment";
import DataTable from "react-data-table-component";
import { planColumns } from "@/app/feeding-plan/index/planInfo";

const { default: PageLayout } = require("@/layout/pageLayout");

const PlanTable = ({ planData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h3 className="text-2xl font-bold mb-4">Feeding Plan For Bird</h3>
      <DataTable
        columns={planColumns}
        data={planData}
        pagination
        //customStyles={customStyles}
      />
    </div>
  );
};

const BirdDetailPage = () => {
  const params = useParams();
  const birdId = parseInt(params.id, 10);

  const { response: planResponse, loading: planLoading, error: planError } = useAxios({
    method: "get",
    url: `${API}/feedingplan/?filter=Bird/ID eq ${birdId}&$expand=MealMenu,Bird`,
  });

  const planData = planResponse || [];

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
    return (
      <PageLayout>
        <div className="flex flex-col gap-4">
          <Link
            href={"/birds/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Bird Details</h2>
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
              href={"/birds/index"}
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
            </Link>
            <h2 className="text-3xl font-bold">Bird Details</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Spinner />
          </div>
        </div>
      </PageLayout>
    );

  // useEffect(() => {
  //   setBirdData(response.data[0]);
  // }, [response]);
  const birdData = response ? response[0] : {};
  console.log(birdData);

  // const birdDate = birdData.doB;
  // const birthDateParts = birdDate
  //   ? birdDate.split("/")
  //   : "30/04/2023".split("/");
  // const day = parseInt(birthDateParts[0], 10);
  // const month = parseInt(birthDateParts[1], 10) - 1; // Subtract 1 because months are zero-based
  // const year = parseInt(birthDateParts[2], 10);

  //const formattedBirthDate = new Date(year, month, day).toLocaleDateString();

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
        {birdData ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="birdId" className="text-lg font-bold">
                  Bird Id
                </label>
                <p>{birdData.ID}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="description" className="text-lg font-bold">
                  Description
                </label>
                <p>{birdData.Description}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="birdImageUrl" className="text-lg font-bold">Bird Image Url</label>
                <Image src={birdData.BirdImageUrl} alt="Bird Image Url" width={100} height={100} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="species" className="text-lg font-bold">
                  Species
                </label>
                <p>{birdData.Species.Name}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="cageID" className="text-lg font-bold">
                  Cage
                </label>
                <p>{birdData.Cage.ID}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="birthDate" className="text-lg font-bold">
                  Birth date (Month/Date/Year)
                </label>
                <p>{moment(birdData.DoB).format("DD/MM/YYYY")}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="gender" className="text-lg font-bold">
                  Gender
                </label>
                <p>{birdData.Gender}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="lastModifyDate" className="text-lg font-bold">
                  Last Modify Date
                </label>
                <p>{moment(birdData.LastModifyDate).format("DD/MM/YYYY")}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="status" className="text-lg font-bold">
                  Status
                </label>
                <p>{birdStatusEnum[birdData.BirdStatus]}</p>
              </div>
            </div>
          </div>
        ) : (
          <>No data</>
        )}
        <PlanTable planData={planData} />
      </div>
    </PageLayout>
  );
};

export default BirdDetailPage;
