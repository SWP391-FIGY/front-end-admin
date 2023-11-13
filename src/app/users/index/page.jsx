"use client";
import UserList from "./userList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "./userInfo";

const UserListPage = () => {
  const router = useRouter();
  const user = getUserInfo();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">User List</h2>
          {user && userRoleEnums[user.role] === "Admin" && (
            <Link href={"/users/create"}>
              <Button>
                <div className="flex flex-row justify-center gap-4">
                  <div className="my-auto">
                    <HiPlus />
                  </div>
                  <p>Add new user</p>
                </div>
              </Button>
            </Link>
          )}
        </div>
        <UserList />
      </div>
    </PageLayout>
  );
};

export default UserListPage;
