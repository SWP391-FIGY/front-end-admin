"use client";

import { useAuthContext } from "@/contexts/authContext";
import PageLayout from "@/layout/pageLayout";
import { Spinner } from "flowbite-react";
import Image from "next/image";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <h2 className="text-3xl font-bold">Dashboard</h2>
        {user ? (
          <></>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
