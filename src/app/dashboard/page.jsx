"use client";

import StaffDashboard from "@/components/Dashboard/StaffDashboard";
import { useAuthContext } from "@/contexts/authContext";
import { getUserInfo } from "@/helper";
import AuthLayout from "@/layout/authLayout";
import PageLayout from "@/layout/pageLayout";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { userRoleEnums } from "./users/index/userInfo";

export default function Home() {
  const user = getUserInfo();
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        {user && userRoleEnums[user.role] === "Staff" ? (
          <>
            <StaffDashboard />
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
