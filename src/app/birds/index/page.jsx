"use client";
//import BirdList from "./birdList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicBirdList = dynamic(() => import('./birdList'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
const BirdListPage = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Bird List</h2>
          <form action="/search" method="get">
            <input type="text" name="search" placeholder="Enter your search"/>
            <button type="submit">Search</button>
          </form>
          <Link href={"/birds/create"}>
            <Button>
              <div className="flex flex-row justify-center gap-4">
                <div className="my-auto">
                  <HiPlus />
                </div>
                <p>Add new bird</p>
              </div>
            </Button>
          </Link>
        </div>
        <DynamicBirdList />
      </div>
    </PageLayout>
  );
};

export default BirdListPage;
