import Link from 'next/link';

import Tippy from '@tippyjs/react';
import { Tag } from 'antd';
import { Dropdown } from 'flowbite-react';
import _get from 'lodash/get';
import moment from 'moment';
import { FiEdit, FiEye, FiMoreVertical } from 'react-icons/fi';

import { getUserInfo } from '@/helper';
import { truncate } from '@/utils/string.helper';

const user = getUserInfo();
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
    label: 'Not Assign',
    value: 'Not Assign',
    color: 'gray',
  },
  {
    label: 'Pending',
    value: 'Pending',
    color: 'yellow',
  },
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
    label: 'Overdue',
    value: 'Overdue',
    color: 'red',
  },
  {
    label: 'Ongoing',
    value: 'Ongoing',
    color: 'blue',
  },
  {
    label: 'Upcoming',
    value: 'Upcoming',
    color: 'green',
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
