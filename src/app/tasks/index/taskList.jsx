import { useEffect, useState } from 'react';

import { message } from 'antd';
import { Select, Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';

import { API } from '@/constants';
import { getUserInfo } from '@/helper';
import useAxios from '@/hooks/useFetch';

import { taskStatusEnum, taskStatusOptions, todoCageColumns } from '../index/taskInfo';
import { taskColumns } from './taskInfo';

const TaskList = () => {
  const ALL_TASK_DISPLAY = 'All tasks';
  const TODAY_TASK_DISPLAY = 'Today tasks';
  const TOMORROW_TASK_DISPLAY = 'Tomorrow tasks';
  const TODO_CAGE_DISPLAY = 'To do cages';
  const [taskStatus, setTaskStatus] = useState('');
  const [displayType, setDisplayType] = useState(ALL_TASK_DISPLAY);
  const [keyword, setKeyword] = useState('');
  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: 'get',
    url: `${API}/tasks?expand=staff,cage($expand=currentbirds,species)`,
  });

  const {
    response: todoResponse,
    loading: todoLoading,
    error: todoError,
  } = useAxios({
    method: 'get',
    url: `${API}/tasks/todocages`,
  });
  const [taskData, setTaskData] = useState([]);

  const user = getUserInfo();
  useEffect(() => {
    if (user && taskResponse && taskResponse.length > 0) {
      console.log(taskResponse);
      user.role === 'Staff' ? setTaskData(taskResponse.filter((x) => x.Staff.Id == user.id)) : setTaskData(taskResponse);
    }
  }, [taskResponse]);

  if (taskError) {
    message.error('Error While Getting Task data');
    return <>No Data</>;
  }
  if (taskLoading && todoLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );

  const customStyles = {
    rows: {
      style: {
        padding: '20px 0',
      },
    },
    headCells: {
      // style: {
      //   paddingLeft: "3px", // override the cell padding for data cells
      //   paddingRight: "3px",
      // },
    },
    cells: {
      // style: {
      //   paddingLeft: "3px", // override the cell padding for data cells
      //   paddingRight: "3px",
      // },
    },
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            console.log(keyword);
          }}
          name="search"
          placeholder="Enter your search"
        />

        <Select
          className="w-48"
          onChange={(e) => {
            const stringSelection = e.target.value;
            setTaskStatus(stringSelection);
          }}
          value={taskStatus}
        >
          <option value="">All</option>
          {taskStatusEnum.map((status, index) => {
            return (
              <option key={index} value={status}>
                {status}
              </option>
            );
          })}
        </Select>
        <Select
          className="w-48"
          onChange={(e) => {
            const stringSelection = e.target.value;
            setDisplayType(stringSelection);
          }}
          value={displayType}
        >
          <option>{ALL_TASK_DISPLAY}</option>
          <option>{TODAY_TASK_DISPLAY}</option>
          <option>{TOMORROW_TASK_DISPLAY}</option>
          {user && user.role !== 'Staff' && <option>{TODO_CAGE_DISPLAY}</option>}
        </Select>
      </div>
      {todoResponse && taskResponse && displayType == ALL_TASK_DISPLAY && (
        <DataTable
          columns={taskColumns}
          data={
            taskData
              ?.filter((x) => {
                const idMatch = x.Id.toString().includes(keyword);
                //const birdIdMatch = (x.birdId != null && x.birdId.toString().includes(keyword));
                const nameMatch = x.Name.toLowerCase().includes(keyword.toLowerCase());
                return idMatch || nameMatch;
              })
              .filter((x) => {
                return taskStatus && taskStatus.length > 0 ? x.Status === taskStatus : true;
              }) || []
          }
          pagination
          defaultSortFieldId={8}
          defaultSortAsc={false}
          className="overflow-auto"
          customStyles={customStyles}
        />
      )}
      {todoResponse && taskResponse && displayType == TODAY_TASK_DISPLAY && (
        <DataTable
          columns={taskColumns}
          data={
            taskData
              ?.filter((x) => {
                const idMatch = x.Id.toString().includes(keyword);
                //const birdIdMatch = (x.birdId != null && x.birdId.toString().includes(keyword));
                const nameMatch = x.Name.toLowerCase().includes(keyword.toLowerCase());
                return idMatch || nameMatch;
              })
              .filter((x) => {
                const taskDate = new Date(x.AssignDate);
                const today = new Date();

                var isTodayTask;
                if (
                  taskDate.getFullYear() === today.getFullYear() &&
                  taskDate.getMonth() === today.getMonth() &&
                  taskDate.getDate() === today.getDate()
                ) {
                  isTodayTask = true;
                } else {
                  isTodayTask = false;
                }
                return (taskStatus && taskStatus.length > 0 ? x.Status === taskStatus : true) && isTodayTask;
              }) || []
          }
          pagination
          defaultSortFieldId={5}
          defaultSortAsc={false}
          className="overflow-auto"
          customStyles={customStyles}
        />
      )}

      {todoResponse && taskResponse && displayType == TOMORROW_TASK_DISPLAY && (
        <DataTable
          columns={taskColumns}
          data={
            taskData
              ?.filter((x) => {
                const idMatch = x.Id.toString().includes(keyword);
                //const birdIdMatch = (x.birdId != null && x.birdId.toString().includes(keyword));
                const nameMatch = x.Name.toLowerCase().includes(keyword.toLowerCase());
                return idMatch || nameMatch;
              })
              .filter((x) => {
                const taskDate = new Date(x.AssignDate);
                const tomorrow = new Date();

                var isTomorrowTask;
                if (
                  taskDate.getFullYear() === tomorrow.getFullYear() &&
                  taskDate.getMonth() === tomorrow.getMonth() &&
                  taskDate.getDate() === tomorrow.getDate() + 1
                ) {
                  isTomorrowTask = true;
                } else {
                  isTomorrowTask = false;
                }
                return (taskStatus && taskStatus.length > 0 ? x.Status === taskStatus : true) && isTomorrowTask;
              }) || []
          }
          pagination
          defaultSortFieldId={5}
          defaultSortAsc={false}
          className="overflow-auto"
          customStyles={customStyles}
        />
      )}
      {/* Display todoResponse using todoCageColumns */}
      {todoResponse && taskResponse && displayType === TODO_CAGE_DISPLAY && (
        <DataTable
          columns={todoCageColumns}
          data={todoResponse.filter((x) => {
            var activeBirdInCage = x.currentBirds ? x.currentBirds.filter((x) => x.status != 'Sold' && x.status != 'Dead').length : 0;
            console.log(activeBirdInCage);
            return activeBirdInCage > 0;
          })}
          pagination
          className="overflow-auto"
          customStyles={customStyles}
        />
      )}
    </>
  );
};

export default TaskList;
