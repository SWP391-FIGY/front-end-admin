import Link from 'next/link';

import Tippy from '@tippyjs/react';
import { Tag, message } from 'antd';
import { Dropdown } from 'flowbite-react';
import _get from 'lodash/get';
import moment from 'moment';
import { FiEdit, FiEye, FiMoreVertical } from 'react-icons/fi';

import { API } from '@/constants';
import { getUserInfo } from '@/helper';
import { truncate } from '@/utils/string.helper';
import { BsCheck } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdCancel } from "react-icons/md";

const user = getUserInfo();
const handleChangeStatus = async (row, status) => {
  try {
    const response = await fetch(`${API}/tasks/${row.Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...row,
        Status: status,
      }),
    });

    if (response.ok) {
      message.info(`Task ${row.Id} status updated`);
    } else {
      console.error(`Failed to update task ${row.Id} status: ${response.statusText}`);
    }
    location.reload()
  } catch (error) {
    console.error(`Error updating task ${row.Id} status: ${error.message}`);
  }
};
export const taskColumns = [
  {
    name: 'ID',
    selector: (row) => row.Id,
    sortable: true,
    width: '70px',
  },
  {
    name: 'Cage',
    selector: (row) => {
      const size = _get(row, 'Cage.Id', '');
      const type = _get(row, 'Cage.Period', '');

      return `${size} - ${type}`;
    },
    sortable: true,
  },
  {
    name: 'Species',
    selector: (row) => row.Cage.Species.Name,

    wrap: true,
  },
  {
    name: 'Birds in cage',
    selector: (row) => (row.Cage.CurrentBirds ? row.Cage.CurrentBirds.filter((x) => x.Status != 'Sold' && x.Status != 'Dead').length : 0),
    sortable: true,
  },
  {
    name: 'Staff',
    selector: (row) => row.Staff.FullName,

    wrap: true,
  },
  {
    name: 'Task Name',
    selector: (row) => row.Name,
  },
  {
    name: 'Description',
    selector: (row) => (
      <Tippy content={row.Description}>
        <div>{truncate(row.Description, 20)}</div>
      </Tippy>
    ),

    wrap: true,
  },
  {
    name: 'Assign Date',
    selector: (row) => moment(row.AssignDate).format('DD/MM/YYYY'),
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => {
      const option = taskStatusOptions.find((item) => item.value === row.Status);

      return <Tag color={option.color}>{option.label}</Tag>;
    },
  },
  {
    name: 'Action',
    allowOverflow:true,
    cell: (row) => {
      return (
        <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
          {user && user.role !== 'Staff' && (
            <Link href={`/tasks/edit/${row.Id}`}>
              <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
            </Link>
          )}
          <Link href={`/tasks/details/${row.Id}`}>
            <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
          </Link>
          {row.Status != 'Cancel' && row.Status != 'Done' && <Dropdown.Item onClick={() => handleChangeStatus(row, 'Done')} icon={BsCheck}>Mark as Done</Dropdown.Item>}
          {row.Status != 'Ongoing' && <Dropdown.Item onClick={() => handleChangeStatus(row, 'Ongoing')} icon={GiSandsOfTime}>Mark task as Ongoing</Dropdown.Item>}
          {user && user.role != 'Staff' && row.Status != 'Done' && row.Status != 'Cancel' && (
            <Dropdown.Item onClick={() => handleChangeStatus(row, 'Cancel')} icon={MdCancel}>Cancel task</Dropdown.Item>
          )}
        </Dropdown>
      );
    },
  },
];

export const todoCageColumns = [
  {
    name: 'Cage ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Birds in cage',
    selector: (row) => (row.currentBirds ? row.currentBirds.filter((x) => x.status != 'Sold' && x.status != 'Dead').length : 0),
    sortable: true,
  },
  {
    name: 'Period',
    selector: 'period',
    sortable: true,
  },
  {
    name: 'Species Name',
    selector: 'species.name',
    sortable: true,
  },
];
export const taskStatusEnum = ['Done', 'Cancel', 'Ongoing'];

export const taskStatusOptions = [
  
  
  {
    label: 'Done',
    value: 'Done',
    color: 'green',
  },
  {
    label: 'Cancel',
    value: 'Cancel',
    color: 'red',
  },
  
  {
    label: 'Ongoing',
    value: 'Ongoing',
    color: 'blue',
  },
  
];

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
