import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { FaTasks } from 'react-icons/fa';

import { taskColumns } from '@/app/tasks/index/taskInfo';
import { API } from '@/constants';
import { getUserInfo } from '@/helper';
import useAxios from '@/hooks/useFetch';

import { BirdPieChart } from '../Chart/birdPieChartData';
import CageBarChartData from '../Chart/cageBarChartData';
import { CardStatistics } from '../Chart/cardStatistics';

const StaffDashboard = () => {
  const user = getUserInfo();

  // Task info from api
  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: 'get',
    url: `${API}/tasks?expand=staff`,
  });

  const tasks = useQuery({
    queryKey: ['task'],
    queryFn: async () => {
      const res = await axios.get(`${API}/tasks?expand=staff`);

      return {
        Ongoing: res.data.filter((x) => {
          return x.Status == 'Ongoing';
        }).length,

        Done: res.data.filter((x) => {
          return x.Status == 'Done';
        }).length,

        Overdue: res.data.filter((x) => {
          return x.Status == 'Overdue';
        }).length,

        Cancel: res.data.filter((x) => {
          return x.Status == 'Cancel';
        }).length,
      };
    },
    initialData: {
      Ongoing: 0,
      Done: 0,
      Overdue: 0,
      Cancel: 0,
    },
  });

  // const myTask = useQuery({
  //   queryKey: ['myTask', user.id],
  //   queryFn: async () => {
  //     console.log('user.id', user.id);
  //     const res = await axios.get(`${API}/tasks?expand=staff`);

  //     console.log('res.data', res.data);

  //     return res.data.filter((x) => {
  //       return x.StaffID == user.id && x.Status !== 'Done';
  //     });
  //   },
  //   enabled: Boolean(user.id),
  //   initialData: [],
  // });

  // Bird info from api
  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: 'get',
    url: `${API}/bird?expand=species`,
  });

  // const today = new Date();
  // const twoDaysFromToday = today.setDate(today.getDate() + 2);

  console.log('taskResponse', tasks.data);

  return (
    <div className="flex flex-col gap-8 ">
      <div className="grid w-full grid-cols-5 gap-16">
        <CardStatistics label="On Going" value={tasks.data.Ongoing} color="yellow" prefix={<FaTasks className="w-8 h-8" />} />
        <CardStatistics label="Overdue" value={tasks.data.Overdue} color="orange" prefix={<FaTasks className="w-8 h-8" />} />
        <CardStatistics label="Done" value={tasks.data.Done} color="green" prefix={<FaTasks className="w-8 h-8" />} />
        <CardStatistics label="Cancel" value={tasks.data.Cancel} color="red" prefix={<FaTasks className="w-8 h-8" />} />
      </div>
      <div className="grid grid-cols-4 gap-16">
        <div className="flex flex-col w-full col-span-3 gap-4">
          {taskResponse && (
            <DataTable
              columns={taskColumns}
              data={
                user.role == 2
                  ? taskResponse.filter((x) => {
                      return x.StaffID == user.id && x.Status != 'Done';
                    })
                  : taskResponse.filter((x) => {
                      return x.Status != 'Done';
                    })
              }
              pagination
              className="overflow-auto"
            />
          )}
          {taskLoading && <Spinner />}
          {taskError && <div>Error</div>}
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex  items-center justify-center flex-col w-full h-[300px] gap-4 ">
            <div className="text-sm font-semibold">Bird Status</div>
            <BirdPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
