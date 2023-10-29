"use client";

import Link from "next/link";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import MenuList from "./menuList";

const { default: PageLayout } = require("@/layout/pageLayout");

const MenuListPage = () => {
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Menu List</h2>
          <Link href={"/menu/create"}>
            <Button>
              <div className="flex flex-row justify-center gap-4">
                <div className="my-auto">
                  <HiPlus />
                </div>
                <p>Add new menu</p>
              </div>
            </Button>
          </Link>
        </div>
        <MenuList />
      </div>
    </PageLayout>
  );
};

export default MenuListPage;
