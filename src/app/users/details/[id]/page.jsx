'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Spinner } from 'flowbite-react';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { userStatusEnums } from '../../index/userInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const UserDetailPage = () => {
  const params = useParams();
  const userId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/user/?filter=ID%20eq%20${userId}`,
  });

  if (isNaN(userId) || userId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>User not found.</p>
      </div>
    );
  }
  if (error) {
    message.error('Error While Getting User data');
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <Spinner />
      </div>
    );

  const userData = response[0];
  console.log(userData);

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col gap-4">
        <Link href={'/users/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className="text-3xl font-bold">User Details</h2>
      </div>
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="id" className="text-lg font-bold">
              ID
            </label>
            <p>{userId}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className="text-lg font-bold">
              Full name
            </label>
            <p>{userData.name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="email" className="text-lg font-bold">
              Email
            </label>
            <p>{userData.email}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="role" className="text-lg font-bold">
              Role
            </label>
            <p>{userData.role}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="status" className="text-lg font-bold">
              Status
            </label>
            <p>{userStatusEnums[userData.status]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
