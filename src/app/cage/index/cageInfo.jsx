import Link from 'next/link';

import { Dropdown } from 'flowbite-react';
import { FiEdit, FiEye, FiMoreVertical } from 'react-icons/fi';

import { getUserInfo } from '@/helper';
import { Tag } from 'antd';

const user = getUserInfo();
export const cageColumns = [
  {
    name: 'ID',
    selector: (row) => row.Id,
    sortable: true,
  },
  {
    name: 'Species',
    selector: (row) => row.Species.Name,
    sortable: true,
  },
  {
    name: 'Period',
    selector: (row) => row.Period,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => {
      const value = cageStatusOptions.find((item) => item.value === row.Status);

      return <Tag color={value.color}>{value.value}</Tag>;
    },
    sortable: true,
  },
  {
    name: 'Birds in cage',
    selector: (row) => (row.CurrentBirds ? row.CurrentBirds.filter((x) => x.Status != 'Sold' && x.Status != 'Dead').length : 0),
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        {user && user.role !== 'Staff' && (
          <Link href={`/cage/edit/${row.Id}`}>
            <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
          </Link>
        )}
        <Link href={`/cage/details/${row.Id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const cageStatusOptions = [
  { label: 'Active', value: 'Active', color: 'green' },
  { label: 'Inactive', value: 'Inactive', color: 'red' },
];
