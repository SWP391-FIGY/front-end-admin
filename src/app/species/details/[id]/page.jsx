'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Label, Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';

import { birdColumns } from '@/app/birds/index/birdInfo';
import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { speciesStatusOptions } from '../../index/speciesInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const BirdTable = ({ birdData }) => {
  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-2xl font-bold">Birds From Species</h3>
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

  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: 'get',
    url: `${API}/bird/?filter=Species/ID eq ${speciesId}&$expand=Cage,Species`,
  });

  const birdData = birdResponse || [];

  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/species/?filter=ID%20eq%20${speciesId}&select=*`,
  });

  if (isNaN(speciesId) || speciesId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>Species not found.</p>
      </div>
    );
  }

  if (error) {
    message.error('Error While Getting Species Data');
    return (
      <>
        <div className="flex flex-col gap-4">
          <Link href={'/species/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Species Details</h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">No data</div>
      </>
    );
  }
  if (loading && !error)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in fade-in">
        <div className="flex flex-row justify-around gap-4">
          <Link href={'/species/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Species Details</h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <Spinner />
        </div>
      </div>
    );

  const speciesData = response[0];
  console.log(speciesData);
  
  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col gap-4">
        <Link href={'/species/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className="text-3xl font-bold">Species Details</h2>
      </div>
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="color" className="text-lg font-bold">
              Name
            </label>
            <p>{speciesData.Name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="imageLink" className="text-lg font-bold">
              Image
            </label>
            <Image src={speciesData.DescriptionImage} alt="Species Image" width={100} height={100} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="habitat" className="text-lg font-bold">
              Habitat
            </label>
            <p>{speciesData.Habitat}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="habitat" className="text-lg font-bold">
              Status
            </label>
            <p>{speciesData.Status}</p>
          </div>
        </div>
      </div>
      <BirdTable birdData={birdData} />
    </div>
  );
};

export default SpeciesDetailPage;
