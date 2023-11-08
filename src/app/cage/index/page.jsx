"use client";

import Link from "next/link";
import CageList from "./cageList";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

const { default: PageLayout } = require("@/layout/pageLayout");

const CageListPage = () => {
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
