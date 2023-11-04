"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const UserDetailPage = () => {
  const params = useParams();
  const userId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/user/?filter=ID%20eq%20${userId}`,
  });

  if (isNaN(userId) || userId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>User not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting User data");
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

  const userData = response[0];
  console.log(userData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/users/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">User Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{userData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="text-lg font-bold">
                User name
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
              <label htmlFor="firebaseID" className="text-lg font-bold">
              Firebase ID
              </label>
              <p>{userData.firebaseID}</p>
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
              <p>{userData.status}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserDetailPage;
