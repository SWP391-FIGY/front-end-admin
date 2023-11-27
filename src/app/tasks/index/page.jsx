'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button, Select } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';

import { getUserInfo } from '@/helper';

import { taskStatusOptions } from '../index/taskInfo';
import TaskList from './taskList';

const TaskListPage = () => {
  const [taskStatus, setTaskStatus] = useState('');
  const user = getUserInfo();

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in fade-in ">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold">Task List</h2>

        {user && user.role !== 'Staff' && (
          <Link href={'/tasks/create'}>
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
  );
};

export default TaskListPage;
