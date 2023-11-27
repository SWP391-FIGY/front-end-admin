'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Table, Tag, message } from 'antd';
import { Descriptions } from 'antd';
import axios from 'axios';
import { Label, Spinner } from 'flowbite-react';
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
    url: `${API}/tasks/?filter=ID%20eq%20${taskId}&expand=Cage,Staff`,
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
          Cage {taskData?.Cage?.Id}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Staff">
          {taskData?.Staff?.FullName}
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">{moment(taskData?.StartDate).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
        <Descriptions.Item label="End Date" span={2}>
          {moment(taskData?.EndDate).format('DD/MM/YYYY HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Tag color={option?.color}>{option?.label}</Tag>
        </Descriptions.Item>

        <Descriptions.Item span={3} label="Description">
          {taskData?.Description}
        </Descriptions.Item>
      </Descriptions>
      <div className="flex flex-col gap-4">
        <Table
          scroll={{ x: 1500 }}
          size="small"
          columns={[
            {
              title: 'Role',
              dataIndex: 'Role',
              key: 'Role',
              width: 100,
            },
            ...taskRangeDate.map((date) => ({
              title: date.format('DD/MM/YYYY'),
              dataIndex: date.format('DD/MM/YYYY'),
              key: date.format('DD/MM/YYYY'),
              width: 150,
            })),
          ]}
          dataSource={[
            [
              {
                Role: 'Staff',
              },
              ...taskRangeDate,
            ],
            user?.Role === 'Admin'
              ? [
                  {
                    Role: 'Manager',
                  },
                  ...taskRangeDate,
                ]
              : [],
          ].map((date) => {
            const data = {};
            let isManager = false;
            if (date?.[0]?.Role === 'Manager') {
              isManager = true;
            }
            date.forEach((item) => {
              if (item.Role) {
                data.Role = item.Role;
                return;
              }

              const key = item.format('DD/MM/YYYY');
              data[key] = (
                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-col items-start justify-center gap-2">
                    <input
                      type="checkbox"
                      disabled={taskData?.Status?.toLowerCase() !== 'pending ' && taskData?.Status?.toLowerCase() !== 'ongoing'}
                      checked={isManager ? taskData?.ManagerChecked.split(',').includes(key) : taskData?.StaffChecked.split(',').includes(key)}
                      onChange={async (e) => {
                        if (!taskData.ManagerChecked) {
                          taskData.ManagerChecked = '';
                        }
                        if (!taskData.StaffChecked) {
                          taskData.StaffChecked = '';
                        }

                        if (isManager) {
                          const newManagerChecked = [...taskData?.ManagerChecked.split(',')].filter((item) => item !== '');
                          if (newManagerChecked.includes(key)) {
                            newManagerChecked.splice(newManagerChecked.indexOf(key), 1);
                          } else {
                            newManagerChecked.push(key);
                          }

                          await axios.put(`${API}/tasks/${taskId}`, {
                            managerChecked: newManagerChecked.join(','),
                            staffChecked: taskData?.StaffChecked,
                            id: taskId,
                            cageId: taskData?.Cage?.Id,
                            name: taskData?.Name,
                            description: taskData?.Description,
                            status: taskData?.Status,
                            startDate: taskData?.StartDate,
                            endDate: taskData?.EndDate,
                            staffId: taskData?.Staff?.Id,
                          });
                        } else {
                          const newStaffChecked = [...taskData?.StaffChecked.split(',')].filter((item) => item !== '');
                          if (newStaffChecked.includes(key)) {
                            newStaffChecked.splice(newStaffChecked.indexOf(key), 1);
                          } else {
                            newStaffChecked.push(key);
                          }

                          await axios.put(`${API}/tasks/${taskId}`, {
                            staffChecked: newStaffChecked.join(','),
                            managerChecked: taskData?.ManagerChecked,
                            id: taskId,
                            cageId: taskData?.Cage?.Id,
                            name: taskData?.Name,
                            description: taskData?.Description,
                            status: taskData?.Status,
                            startDate: taskData?.StartDate,
                            endDate: taskData?.EndDate,
                            staffId: taskData?.Staff?.Id,
                          });
                        }
                        message.success('Update Success');
                        refetch();
                      }}
                    />
                  </div>
                </div>
              );
            });
            return data;
          })}
          pagination={false}
          rowKey={(record) => record}
          className="bg-white rounded-lg"
        />
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
