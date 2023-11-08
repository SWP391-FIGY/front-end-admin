"use client";
import CageList from "./cageList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";

const CageListPage = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Cage List</h2>
          <form action="/search" method="get">
            <input type="text" name="search" placeholder="Enter your search"/>
            <button type="submit">Search</button>
          </form>
          <Link href={"/cage/create"}>
            <Button>
              <div className="flex flex-row justify-center gap-4">
                <div className="my-auto">
                  <HiPlus />
                </div>
                <p>Add new cage</p>
              </div>
            </Button>
          </Link>
        </div>
        <CageList />
      </div>
    </PageLayout>
  );
};

export default CageListPage;
