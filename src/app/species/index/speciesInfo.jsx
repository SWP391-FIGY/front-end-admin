import Link from 'next/link';

import Tippy from '@tippyjs/react';
import { Dropdown } from 'flowbite-react';
import { truncate } from 'lodash';
import { FiEdit, FiEye, FiMoreVertical } from 'react-icons/fi';
import { GiSoundOn } from 'react-icons/gi';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { getUserInfo } from '@/helper';
import { Tag } from 'antd';

const user = getUserInfo();
export const speciesColumns = [
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
    name: 'Image Link',
    cell: (row) => {
      return (
        <PhotoProvider>
          <PhotoView src={row.descriptionImage}>
            <img src={row.descriptionImage} className="object-cover w-16 h-16" />
          </PhotoView>
        </PhotoProvider>
      );
    },
  },
  {
    name: 'Habitat',
    selector: (row) => (
      <Tippy content={row.habitat}>
        <div>{truncate(row.habitat, 20)}</div>
      </Tippy>
    ),
    wrap: true,
  },
  {
    name: 'Status',
    selector: (row) => {
      const value = speciesStatusOptions.find((item) => item.value === row.status);

      return <Tag color={value.color}>{value.value}</Tag>;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        {user && user.role !== 'Staff' && (
          <Link href={`/species/edit/${row.id}`}>
            <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
          </Link>
        )}
        <Link href={`/species/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
export const speciesStatusOptions = [
  { label: 'Active', value: 'Active', color: 'green' },
  { label: 'Inactive', value: 'Inactive', color: 'red' },
];
