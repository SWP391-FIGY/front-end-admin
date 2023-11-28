'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Descriptions } from 'antd';
import { Button, Label, Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';

import { birdColumns } from '@/app/birds/index/birdInfo';
import { taskColumns } from '@/app/tasks/index/taskInfo';
import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';
import { HiPlus } from 'react-icons/hi';
import { getUserInfo } from '@/helper';

const { default: PageLayout } = require('@/layout/pageLayout');

const user = getUserInfo()
const BirdTable = ({ birdData }) => {
  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow">
      <div className="flex flex-row justify-between">
        <h3 className="mb-4 text-2xl font-bold">Birds in Cage</h3>
        {user && user.role !== 'Staff' && (
          <Link href={'/birds/create'}>
            <Button>
              <div className="flex flex-row justify-center gap-4">
                <div className="my-auto">
                  <HiPlus />
                </div>
                <p>Add new bird</p>
              </div>
            </Button>
          </Link>
        )}
      </div>
      <DataTable
        columns={birdColumns}
        data={birdData}
        pagination
        //customStyles={customStyles}
      />
    </div>
  );
};

const TaskTable = ({ taskData }) => {
  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-2xl font-bold">Tasks</h3>
      <DataTable
        columns={taskColumns}
        data={taskData}
        pagination
        //customStyles={customStyles}
      />
    </div>
  );
};

const CageDetailPage = () => {
  const params = useParams();
  const cageId = parseInt(params.id, 10);

  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: 'get',
    url: `${API}/bird/?filter=CageId eq ${cageId}&$expand=Cage,Species`,
  });

  const birdData = birdResponse || [];

  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: 'get',
    url: `${API}/tasks/?filter=CageId eq ${cageId}&$expand=Cage,Staff,Bird`,
  });

  const taskData = taskResponse || [];

  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/cage/?filter=Id%20eq%20${cageId}&expand=species`,
  });

  if (isNaN(cageId) || cageId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>Cage not found.</p>
      </div>
    );
  }
  if (error) {
    message.error('Error While Getting Cage Data');
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <Spinner />
      </div>
    );

  const cageData = response[0];

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col gap-4">
        <Link href={'/cage/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className="text-3xl font-bold">Cage Details</h2>
      </div>
      <div className="p-6 bg-white rounded-lg shadow">
        <Descriptions title="Cage Info" bordered>
          <Descriptions.Item label="ID">{cageData.Id}</Descriptions.Item>
          <Descriptions.Item label="Species">{cageData.Species.Name}</Descriptions.Item>
          <Descriptions.Item label="Period">{cageData.Period}</Descriptions.Item>
          <Descriptions.Item label="Status">{cageData.Status}</Descriptions.Item>
        </Descriptions>

        {/* <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="id" className="text-lg font-bold">
              ID
            </label>
            <p>{cageData.Id}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="size" className="text-lg font-bold">
              Species
            </label>
            <p>{cageData.Species.Name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="type" className="text-lg font-bold">
              Period
            </label>
            <p>{cageData.Period}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="cageStatus" className="text-lg font-bold">
              Status
            </label>
            <p>{cageData.Status}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="capacity" className="text-lg font-bold">
              Capacity
            </label>
            <p>{cageData.Capacity}</p>
          </div>
        </div> */}
      </div>
      <BirdTable birdData={birdData} />

    </div>
  );
};

export default CageDetailPage;
