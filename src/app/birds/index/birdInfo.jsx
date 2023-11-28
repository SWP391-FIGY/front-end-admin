import Link from 'next/link';

import Tippy from '@tippyjs/react';
import { Tag } from 'antd';
import { Dropdown } from 'flowbite-react';
import { truncate } from 'lodash';
import _get from 'lodash/get';
import moment from 'moment';
import { FiEdit, FiEye, FiMoreVertical } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';

export const birdColumns = [
  {
    name: 'Id',
    selector: (row) => {
      return row.Id;
    },
    sortable: true,
  },
  {
    name: 'Species',
    selector: (row) => row.Species.Name,
    sortable: true,
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
  // {
  //   name: 'Previous Cage',
  //   selector: (row) => row.PrevCageId ? row.PrevCageId : 'N/A',
  //   sortable: true,
  // },
  {
    name: 'Last Modified',
    selector: (row) => moment(row.LastModifyDate).format('DD/MM/YYYY'),
    sortable: true,
    wrap: true,
  },
  {
    name: 'Gender',
    selector: (row) => {
      const option = birdGenderOptions.find((item) => item.value === row.Gender);
      return <Tag color={option.color}>{option.label}</Tag>;
    },
    sortable: true,
  },

  {
    name: 'Status',
    selector: (row) => {
      const value = birdStatusOptions.find((item) => item.value === row.Status);

      return <Tag color={value.color}>{value.label}</Tag>;
    },
    sortable: true,
  },
  {
    name: 'Is Sick',
    selector: (row) => {
      const value = birdStatusOptions.find((item) => item.value === row.Status);

      return <Tag color={row.isSick ? 'red' : 'gray'}>{row.isSick ? 'Yes' : 'No'}</Tag>;
    },
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/birds/edit/${row.Id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/birds/details/${row.Id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const birdStatusEnum = ['Active', 'Dead', 'Sick', 'Molt', 'Sold', 'Other', 'Cancel'];

export const birdGender = ['Trống', 'Mái', 'Male', 'Female', 'Cái'];

export const birdGenderOptions = [
  {
    label: 'Trống',
    value: 'Trống',
    color: 'green',
  },
  {
    label: 'Mái',
    value: 'Mái',
    color: 'blue',
  },
  {
    label: 'Trống',
    value: 'Male',
    color: 'green',
  },
  {
    label: 'Mái',
    value: 'Female',
    color: 'blue',
  },
  {
    label: 'Cái',
    value: 'Cái',
    color: 'blue',
  },
];

export const birdStatusOptions = [
  {
    label: 'Active',
    value: 'Active',
    color: 'green',
  },
  { label: 'Dead', value: 'Dead', color: 'red' },
  { label: 'Sick', value: 'Sick', color: 'yellow' },
  { label: 'Molt', value: 'Molt', color: 'purple' },
  { label: 'Sold', value: 'Sold', color: 'blue' },
  { label: 'Other', value: 'Other', color: 'gray' },
  { label: 'Cancel', value: 'Cancel', color: 'gray' },
];
