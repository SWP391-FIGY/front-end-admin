"use client";
import TaskList from "./taskList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { Button } from "flowbite-react";
import Link from "next/link";
import { userRoleEnums } from "@/app/users/index/userInfo";
import { getUserInfo } from "@/helper";

const TaskListPage = () => {
  const user = getUserInfo();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Task List</h2>
          {user && userRoleEnums[user.role] === "Manager" && (
            <Link href={"/tasks/create"}>
              <Button>
                <div className="flex flex-row justify-center gap-4">
                  <div className="my-auto">
                    <HiPlus />
                  </div>
                  <p>Add new task</p>
                </div>
              </Button>
            </Link>
          )}
        </div>
        <TaskList />
      </div>
    </PageLayout>
  );
};

export default TaskListPage;
