import Link from 'next/link';

import { Tag } from 'antd';
import { Dropdown } from 'flowbite-react';
import moment from 'moment';
import { FiEdit, FiEye, FiMoreVertical } from 'react-icons/fi';

import { getUserInfo } from '@/helper';

const user = getUserInfo();
export const foodColumns = [
  {
    name: 'ID',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Note',
    selector: (row) => row.note,
    sortable: true,
  },
  {
    name: 'Unit',
    selector: (row) => row.unit,
    sortable: true,
  },

  {
    name: 'Status',
    selector: (row) => {
      const value = foodStatusOptions.find((item) => item.value === row.status);

      return <Tag color={value.color}>{value.label}</Tag>;
    },
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        {user && user.role !== 'Staff' && (
          <Link href={`/foods/edit/${row.id}`}>
            <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
          </Link>
        )}
        <Link href={`/foods/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const foodStatusEnum = ['Active', 'Inactive'];
export const foodStatusOptions = [
  {
    label: 'Active',
    value: 'Active',
    color: 'green',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
    color: 'red',
  },
];

export const inventoryLogColumns = [
  {
    name: 'Create Date',
    selector: (row) => moment(row.CreateDate).format('DD/MM/YYYY hh:mm'),
  },
  {
    name: 'Quantity',
    selector: (row) => row.Quantity,
  },
  {
    name: 'Type',
    selector: (row) => row.Type,
  },
  {
    name: 'Status',
    selector: (row) => row.Status,
  },
];
