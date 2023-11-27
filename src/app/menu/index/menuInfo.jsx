import Link from 'next/link';

import { Button, Dropdown } from 'flowbite-react';
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from 'react-icons/fi';

const getBirdStatusText = (value) => {
  return value === 1 ? 'Assigned' : value === 2 ? 'Not assigned' : '';
};

const getMenuStatusText = (value) => {
  return value === 1 ? 'In use' : value === 2 ? 'Not in use' : value === 3 ? 'Being revised' : '';
};
export const menuColumns = [
  {
    name: 'Id',
    selector: (row) => row.Id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.Name,
    sortable: true,
  },
  {
    name: 'Species',
    selector: (row) => row.Species && row.Species.Name,
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row) => row.Description,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.Status,
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/menu/edit/${row.Id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/menu/details/${row.Id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const menuDetailColumns = [
  {
    name: 'Food',
    selector: (row) => row.Food.Name,
    sortable: true,
  },
  {
    name: 'Quantity',
    selector: (row) => row.Quantity,
    sortable: true,
  },
];

export const menuStatusEnum = ['Active', 'Inactive'];
