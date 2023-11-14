"use client";
import MenuList from "./menuList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "@/app/users/index/userInfo";

const MenuListPage = () => {
  const router = useRouter();
  const user = getUserInfo();
  
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Menu List</h2>

          {user && userRoleEnums[user.role] !== "Staff" && (
            <Link href={"/menu/create"}>
              <Button>
                <div className="flex flex-row justify-center gap-4">
                  <div className="my-auto">
                    <HiPlus />
                  </div>
                  <p>Add new meal menu</p>
                </div>
              </Button>
            </Link>
          )}
        </div>
        <MenuList />
      </div>
    </PageLayout>
  );
};

export default MenuListPage;
