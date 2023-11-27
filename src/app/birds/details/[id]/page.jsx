'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Label, Spinner } from 'flowbite-react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';

import { planColumns } from '@/app/feeding-plan/index/planInfo';
import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { birdStatusEnum } from '../../index/birdInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const PlanTable = ({ planData }) => {
  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-2xl font-bold">Feeding Plan For Bird</h3>
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

  const {
    response: planResponse,
    loading: planLoading,
    error: planError,
  } = useAxios({
    method: 'get',
    url: `${API}/feedingplan/?filter=Bird/ID eq ${birdId}&$expand=MealMenu,Bird`,
  });

  const planData = planResponse || [];

  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/bird/?filter=ID%20eq%20${birdId}&expand=cage,species`,
  });

  if (isNaN(birdId) || birdId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>Bird not found.</p>
      </div>
    );
  }
  if (error) {
    message.error('Error While Getting Bird data');
    return (
      <>
        <div className="flex flex-col gap-4">
          <Link href={'/birds/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Bird Details</h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">No data</div>
      </>
    );
  }
  if (loading && !error)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <div className="flex flex-row justify-around gap-4">
          <Link href={'/birds/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Bird Details</h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <Spinner />
        </div>
      </div>
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
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col gap-4">
        <Link href={'/birds/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className="text-3xl font-bold">Bird Details</h2>
      </div>
      {birdData ? (
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="birdId" className="text-lg font-bold">
                Bird Id
              </label>
              <p>{birdData.Id}</p>
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
              <p>{birdData.CageId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cageID" className="text-lg font-bold">
                Previous Cage
              </label>
              <p>{birdData.PrevCageId ? birdData.PrevCageId : 'N/A'}</p>
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
              <p>{moment(birdData.LastModifyDate).format('DD/MM/YYYY')}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="text-lg font-bold">
                Status
              </label>
              <p>{birdData.Status}</p>
            </div>
          </div>
        </div>
      ) : (
        <>No data</>
      )}
      <PlanTable planData={planData} />
    </div>
  );
};

export default BirdDetailPage;
