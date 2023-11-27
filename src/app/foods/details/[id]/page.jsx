'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button, Label, Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { BsPlus } from 'react-icons/bs';
import { HiOutlineArrowSmallLeft, HiPlus } from 'react-icons/hi2';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { inventoryLogColumns } from '../../index/foodInfo';
import { message } from 'antd';

const { default: PageLayout } = require('@/layout/pageLayout');

const FoodDetailPage = () => {
  const params = useParams();
  const foodId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/food/?filter=ID%20eq%20${foodId}`,
  });

  if (isNaN(foodId) || foodId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>Food not found.</p>
      </div>
    );
  }
  if (error) {
    message.error('Error While Getting Food Data');
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <Spinner />
      </div>
    );

  const foodData = response[0];
  console.log(foodData);

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col gap-4">
        <Link href={'/foods/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className="text-3xl font-bold">Food Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="ID" className="text-lg font-bold">
              ID
            </label>
            <p>{foodData.id}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="Name" className="text-lg font-bold">
              Name
            </label>
            <p>{foodData.name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="NutritionalIngredients" className="text-lg font-bold">
              Note
            </label>
            <p>{foodData.note}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="Unit" className="text-lg font-bold">
              Unit
            </label>
            <p>{foodData.unit}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FoodDetailPage;
