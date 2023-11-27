'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Label, Spinner, Table } from 'flowbite-react';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

const { default: PageLayout } = require('@/layout/pageLayout');

const MenuDetailPage = () => {
  const params = useParams();
  const menuId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/menu/?filter=ID%20eq%20${menuId}&expand=species,menuFoods($expand=Food)`,
  });

  if (isNaN(menuId) || menuId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>Meal menu not found.</p>
      </div>
    );
  }
  if (error) {
    message.error('Error While Getting Meal Menu Data');
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <Spinner />
      </div>
    );

  const menuData = response[0];
  console.log(menuData);


  const getMenuStatus = (menuStatus) => {
    const statusMapping = {
      1: 'In use',
      2: 'Not in use',
      3: 'Being revised',
    };
    return statusMapping[menuStatus] || 'Unknown';
  };

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col gap-4">
        <Link href={'/menu/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className="text-3xl font-bold">Meal Menu Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="id" className="text-lg font-bold">
              ID
            </label>
            <p>{menuData.Id}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="Name" className="text-lg font-bold">
              Name
            </label>
            <p>{menuData.Name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="speciesId" className="text-lg font-bold">
              Species
            </label>
            <p>{menuData.Species && menuData.Species.Name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="Status" className="text-lg font-bold">
              Status
            </label>
            <p>{menuData.Status}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-lg font-bold">Description</label>
            <p>{menuData.NutritionalIngredients}</p>
          </div>
          {/* Food Details */}
          <div className="col-span-2">
            <label htmlFor="foodDetails" className="text-lg font-bold">
              Food Details
            </label>
            <Table>
              <Table.Head>
                <Table.HeadCell>Food</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Unit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {menuData.MenuFoods &&
                  menuData.MenuFoods.map((item, index) => {
                    const { Food } = item;
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{Food.Name}</Table.Cell>
                        <Table.Cell>{item.Quantity}</Table.Cell>
                        <Table.Cell>{Food.Unit}</Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailPage;
