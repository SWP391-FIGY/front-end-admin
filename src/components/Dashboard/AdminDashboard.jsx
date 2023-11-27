import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaTasks, FaUserFriends } from 'react-icons/fa';
import { GiBirdCage } from 'react-icons/gi';
import { IoMdNutrition } from 'react-icons/io';
import { PiBird } from 'react-icons/pi';

import { API } from '@/constants';

import { groupCountValueByDate } from '../../utils/report.helper';
import { BirdPieChart } from '../Chart/birdPieChartData';
import { CardStatistics } from '../Chart/cardStatistics';
import ChartBasicArea from '../Chart/chartBasicArea';

const AdminDashboard = () => {
  const totalLiveBird = useQuery({
    queryKey: ['totalLiveBird'],
    queryFn: async () => {
      const res = await axios.get(`${API}/bird?expand=cage,species`);

      return res.data.length;
    },
    initialData: 0,
  });

  const totalTask = useQuery({
    queryKey: ['task'],
    queryFn: async () => {
      const res = await axios.get(`${API}/tasks?expand=staff`);

      return res.data.length;
    },
    initialData: 0,
  });

  const totalUser = useQuery({
    queryKey: ['totalUser'],
    queryFn: async () => {
      const res = await axios.get(`${API}/user`);

      return res.data.length;
    },
    initialData: 0,
  });

  const totalCage = useQuery({
    queryKey: ['totalCage'],
    queryFn: async () => {
      const res = await axios.get(`${API}/cage`);

      return res.data.length;
    },
    initialData: 0,
  });

  const totalFood = useQuery({
    queryKey: ['totalFood'],
    queryFn: async () => {
      const res = await axios.get(`${API}/food`);

      return res.data.length;
    },
    initialData: 0,
  });

  const birdByDate = useQuery({
    queryKey: ['birdByDate'],
    queryFn: async () => {
      const res = await axios.get(`${API}/bird`);

      return groupCountValueByDate(
        res.data.map((item) => ({
          time: item.createTime,
        })),
      );
    },
    initialData: [],
  });

  const taskByDate = useQuery({
    queryKey: ['taskByDate'],
    queryFn: async () => {
      const res = await axios.get(`${API}/tasks`);

      return groupCountValueByDate(
        res.data.map((item) => ({
          time: item.createTime,
        })),
      );
    },
    initialData: [],
  });

  const userByDate = useQuery({
    queryKey: ['userByDate'],
    queryFn: async () => {
      const res = await axios.get(`${API}/user`);

      return groupCountValueByDate(
        res.data.map((item) => ({
          time: item.createTime,
        })),
      );
    },
    initialData: [],
  });

  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid w-full grid-cols-5 gap-16">
        <CardStatistics label="Total Bird" value={totalLiveBird.data} color="green" prefix={<PiBird className="w-8 h-8" />} />
        <CardStatistics label="Total Task" value={totalTask.data} color="blue" prefix={<FaTasks className="w-8 h-8" />} />
        <CardStatistics label="Total Cage" value={totalCage.data} color="indigo" prefix={<GiBirdCage className="w-8 h-8" />} />
        <CardStatistics label="Total Food" value={totalFood.data} color="purple" prefix={<IoMdNutrition className="w-8 h-8" />} />
        <CardStatistics label="Total User" value={totalUser.data} color="pink" prefix={<FaUserFriends className="w-8 h-8" />} />
      </div>
      <div className="grid w-full grid-cols-2 gap-16">
        <ChartBasicArea
          title="Bird by date"
          values={Object.keys(birdByDate.data).map((item) => ({
            name: item,
            data: birdByDate.data[item],
          }))}
          colors={['#008FFB']}
          unit="Bird by date"
        />
        <ChartBasicArea
          title="Task by date"
          values={Object.keys(taskByDate.data).map((item) => ({
            name: item,
            data: taskByDate.data[item],
          }))}
          colors={['#00E396']}
          unit="Task by date"
        />
        <ChartBasicArea
          title="User by date"
          values={Object.keys(userByDate.data).map((item) => ({
            name: item,
            data: userByDate.data[item],
          }))}
          colors={['#FEB019']}
          unit="User by date"
        />
        <div className="h-[300px] flex items-center justify-center flex-col">
          <div className="text-sm font-semibold">Bird Status</div>
          <BirdPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
