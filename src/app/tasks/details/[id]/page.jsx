'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Tag, message } from 'antd';
import { Descriptions } from 'antd';
import axios from 'axios';
import { Label, Spinner, Table } from 'flowbite-react';
import moment from 'moment';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';

import { API } from '@/constants';
import { getUserInfo } from '@/helper';
import useAxios from '@/hooks/useFetch';

import { taskStatusOptions } from '../../index/taskInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const TaskDetailPage = () => {
  const params = useParams();
  const taskId = parseInt(params.id, 10);
  const [taskRangeDate, setTaskRangeDate] = useState([]);
  const [taskData, setTaskData] = useState({});

  const user = getUserInfo();

  const { response, loading, error, refetch } = useAxios({
    method: 'get',
    url: `${API}/tasks/?filter=ID%20eq%20${taskId}&expand=Cage($expand=species),Staff`,
  });

  //Get menu list
  const {
    response: menuResponse,
    loading: menuLoading,
    error: menuError,
  } = useAxios({
    method: 'get',
    url: `${API}/menu?expand=species,menufoods($expand=food)`,
  });

  useEffect(() => {
    if (response) {
      // return a array of date between start date and end date

      const start = moment(response[0].StartDate);

      const end = moment(response[0].EndDate);

      const rangeDate = [];
      while (start <= end) {
        rangeDate.push(moment(start));
        start.add(1, 'days');
      }
      setTaskRangeDate(rangeDate);

      setTaskData(response[0]);
    }
  }, [response]);

  if (isNaN(taskId) || taskId < 0) {
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <p>Task not found.</p>
      </div>
    );
  }
  if (error) {
    message.error('Error While Getting Task data');
    return <>No Data</>;
  }
  if (loading && !error && !taskData)
    return (
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
        <Spinner />
      </div>
    );

  const option = taskStatusOptions.find((item) => item.value === taskData?.Status);

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in fade-in  ">
      <div className="flex flex-col gap-4">
        <Link href={'/tasks/index'} className="flex items-center gap-2 text-blue-500 hover:underline">
          <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
        </Link>
      </div>
      <Descriptions title="Task Info" bordered className="p-4 bg-white rounded-lg">
        <Descriptions.Item span={1} label="ID">
          {taskData?.Id}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Task Name">
          {taskData?.Name}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Cage">
          Cage {taskData?.Cage?.Id} - {taskData?.Cage?.Species?.Name} - {taskData?.Cage?.Period}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Number of bird">
          {taskData?.Cage?.CurrentBirds ? row.Cage.CurrentBirds.filter((x) => x.Status != 'Sold' && x.Status != 'Dead').length : 0}
        </Descriptions.Item>
        <Descriptions.Item label="Assign Date">{moment(taskData?.AssignDate).format('DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
        <Tag color={option?.color}>{option?.label}</Tag>
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Description">
          {taskData?.Description}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Staff Name">
        {taskData?.Staff?.FullName}
        </Descriptions.Item>
      </Descriptions>
      <div className="flex flex-col gap-2">
          <Label value="Food items in the selected menu" />
          <Table>
            <Table.Head>
              <Table.HeadCell>Food</Table.HeadCell>
              <Table.HeadCell>Required Quantity</Table.HeadCell>
              <Table.HeadCell>Unit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {menuResponse && taskData &&
                menuResponse.find(x => x.Id == taskData?.MenuId)?.MenuFoods?.map((item, index) => {
                  const foodItem = item.Food;
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{foodItem.Name}</Table.Cell>
                      <Table.Cell>{item.Quantity} </Table.Cell>
                      <Table.Cell>{foodItem.Unit}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
    </div>
  );
};

export default TaskDetailPage;

function formatDateTime(dateTime) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Display in 12-hour format
  };
  return new Date(dateTime).toLocaleString('en-US', options);
}
