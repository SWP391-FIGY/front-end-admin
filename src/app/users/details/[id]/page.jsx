'use client'
import { Label, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { userInfo } from "../../index/userInfo"

const { default: PageLayout } = require("@/layout/pageLayout")

const UserDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

if (isNaN(index) || index < 0 || index >= userInfo.length) {
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <p>User not found.</p>
      </div>
    </PageLayout>
  );
}

const userData = userInfo[index];

return (
  <PageLayout>
    <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col gap-4'>
        <Link href={'/users/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
        <h2 className='text-3xl font-bold'>User Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className="text-lg font-bold">Name</label>
            <p>{userData.name}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="email" className="text-lg font-bold">Email</label>
            <p>{userData.email}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="password" className="text-lg font-bold">Password</label>
            <p>{userData.password}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="phoneNumber" className="text-lg font-bold">Phone number</label>
            <p>{userData.phoneNumber}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="role" className="text-lg font-bold">Role</label>
            <p>{userData.role}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="status" className="text-lg font-bold">Status</label>
            <p>{userData.status}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);
}


export default UserDetailPage;
